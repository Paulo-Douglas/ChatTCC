# 🎓 Ceres TCC AI

Assistente inteligente para pesquisa de Trabalhos de Conclusão de Curso (TCCs) da UFRN, utilizando busca semântica e inteligência artificial para facilitar a descoberta e exploração de trabalhos acadêmicos.

## 📋 Sobre o Projeto

O **Ceres TCC AI** é uma ferramenta desenvolvida para auxiliar estudantes, pesquisadores e orientadores na busca por trabalhos de conclusão de curso da Universidade Federal do Rio Grande do Norte (UFRN). A aplicação utiliza tecnologias modernas de IA para entender a intenção da busca e retornar os trabalhos mais relevantes de forma inteligente e contextualizada.

## ✨ Funcionalidades

- **Busca Semântica Inteligente**: Utiliza embeddings multilíngues para compreender o contexto e a intenção da pesquisa, indo além de simples palavras-chave
- **Respostas em Tempo Real**: Streaming de respostas utilizando LLM (Large Language Model) para explicações claras e didáticas sobre os trabalhos encontrados
- **Cards Interativos**: Apresentação organizada dos TCCs com informações detalhadas (título, autor, orientador, curso, resumo e link)
- **Interface Moderna**: Design limpo e responsivo com foco na experiência do usuário
- **Explicações Contextualizadas**: A IA analisa os resumos dos trabalhos e fornece explicações sobre o que cada TCC aborda

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para construção de interfaces
- **Tailwind CSS 4** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones moderna
- **React Markdown** - Renderização de markdown para respostas formatadas

### Backend & IA
- **Vercel AI SDK** - Framework para integração com modelos de IA
- **Groq (Llama 3.3 70B)** - LLM para geração de respostas inteligentes
- **Hugging Face Inference** - Geração de embeddings vetoriais
- **Qdrant** - Banco de dados vetorial para busca semântica
- **sentence-transformers** - Modelo multilíngue para embeddings de texto

## 🧠 Como Funciona

1. **Pergunta do Usuário**: O usuário faz uma pergunta ou busca por tema, autor ou orientador
2. **Geração de Embedding**: A pergunta é convertida em um vetor semântico usando um modelo transformer multilíngue
3. **Busca Vetorial**: O Qdrant busca os TCCs mais similares semanticamente no banco de dados vetorial
4. **Contextualização**: Os documentos encontrados são organizados e contextualizados para a LLM
5. **Resposta Inteligente**: O modelo Llama analisa os TCCs e gera uma resposta estruturada e didática
6. **Apresentação**: A resposta é exibida em streaming junto com cards interativos dos trabalhos encontrados

## 🎯 Arquitetura RAG (Retrieval-Augmented Generation)

O projeto implementa uma arquitetura RAG completa:

- **Retrieval**: Busca semântica no Qdrant usando embeddings
- **Augmentation**: Contextualização dos documentos para a LLM
- **Generation**: Geração de respostas naturais e informativas com Llama 3.3

## 👥 Casos de Uso

- Estudantes buscando referências para seus TCCs
- Pesquisadores explorando trabalhos sobre temas específicos
- Orientadores identificando trabalhos de seus orientandos
- Descoberta de TCCs por curso ou área de conhecimento
- Análise de tendências e temas recorrentes em trabalhos acadêmicos

## 📄 Licença

Este projeto foi desenvolvido como trabalho acadêmico na UFRN.
