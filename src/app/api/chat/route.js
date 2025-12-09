import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { generateEmbedding } from "@/lib/rag/embeddings";
import { searchSimilar } from "@/lib/rag/qdrant";
import { buildContext } from "@/lib/rag/context";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `Você é um assistente especializado em trabalhos de conclusão de curso (TCCs) da UFRN.

Sua resposta deve ter EXATAMENTE esta estrutura:

1. Um parágrafo introdutório sobre o tema pesquisado
2. Para cada TCC relevante, um parágrafo explicando o que ele faz (baseado no resumo)

Seja objetivo, acadêmico e didático. Use os resumos para explicar cada trabalho.
Sempre responda em português de forma clara e profissional.`;

export async function POST(request) {
  try {
    const body = await request.json();
    const message = body.prompt || body.message; 

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json(
        { error: "Mensagem inválida" },
        { status: 400 }
      );
    }

    const question = message.trim();
    
    const embedding = await generateEmbedding(question);
    const docs = await searchSimilar(embedding, 5);
    const context = buildContext(question, docs);

    const documentsData = docs.map(doc => ({
      title: doc.title,
      author: doc.author,
      advisor: doc.advisor || null,
      course: doc.course,
      url: doc.url,
      abstract: doc.abstract,
      score: doc.score,
    }));

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: SYSTEM_PROMPT,
      prompt: context,
      temperature: 0.7,
      maxTokens: 1024,
    });

    const response = result.toUIMessageStreamResponse({
      init: {
        headers: {
          "X-Documents-Count": documentsData.length.toString(),
        },
      },
      data: {
        documents: documentsData,
      },
    });

    return response;

  } catch (error) {
    console.error("Erro na API:", error.message);
    
    return Response.json(
      { 
        error: "Erro ao processar mensagem",
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    status: "ok",
    service: "Ceres TCC AI",
    timestamp: new Date().toISOString(),
  });
}
