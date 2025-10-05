'use client';

import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
  ConversationHeader,
} from '@/components/ai-elements/conversation';
import { Message } from '@/components/ai-elements/message';
import { PromptInput } from '@/components/ai-elements/prompt-input';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <Conversation>
      <ConversationHeader>
        <h1>OpenBD Chat</h1>
      </ConversationHeader>
      <ConversationContent>
        {messages.map((m, i) => (
          <Message key={i} from={m.role}>
            {m.content}
          </Message>
        ))}
      </ConversationContent>
      <PromptInput
        value={input}
        onValueChange={handleInputChange}
        onSubmit={handleSubmit}
        placeholder="Type a message..."
      />
    </Conversation>
  );
}