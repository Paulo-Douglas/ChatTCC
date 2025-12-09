"use client";

import { useCompletion } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import ChatContainer from "@/components/Chat/ChatContainer";
import ChatFooter from "@/components/ChatFooter/ChatFooter";

export default function Home() {
  const { 
    completion, 
    input, 
    setInput,
    handleInputChange, 
    handleSubmit, 
    isLoading,
    data 
  } = useCompletion({
    api: "/api/chat",
  });
  
  const [documents, setDocuments] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const latestData = data[data.length - 1];
      if (latestData.documents) {
        setDocuments(latestData.documents);
      }
    }
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      setDocuments([]);
      
      // Adiciona mensagem do usuário
      setMessages((prev) => [...prev, { 
        id: Date.now(), 
        text: input, 
        sender: "user" 
      }]);
      
      // Envia e limpa o input manualmente
      handleSubmit(e);
      
      setTimeout(() => {
        setInput("");
      }, 0);
    }
  };

  // Quando a completion terminar, salva como mensagem do bot
  useEffect(() => {
    if (!isLoading && completion && completion.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.sender === "user") {
        setMessages((prev) => [...prev, {
          id: Date.now(),
          text: completion,
          sender: "bot",
          documents: documents
        }]);
      }
    }
  }, [isLoading, completion, messages, documents]);

  return (
    <div className="flex flex-col h-full">
      <ChatContainer 
        messages={messages} 
        completion={isLoading ? completion : ""}
        isLoading={isLoading}
        documents={documents}
      />
      <ChatFooter 
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
