'use client';

import { useChat } from '@ai-sdk/react';

export function useOpenBDChat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: '/api/openbd',
    });

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
  };
}