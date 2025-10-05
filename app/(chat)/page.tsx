'use client';

import { useOpenBDChat } from '@/hooks/use-openbd-chat';
import { Conversation } from '@/components/chat/Conversation';
import { Message } from '@/components/chat/Message';
import { PromptInput } from '@/components/chat/PromptInput';
import { Response } from '@/components/chat/Response';
import { ToolOutput } from '@/components/chat/ToolOutput';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useOpenBDChat();

  return (
    <Conversation>
      {messages.map((m, i) => (
        <Message key={i} from={m.role}>
          {m.content}
        </Message>
      ))}
      <PromptInput
        value={input}
        onValueChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Conversation>
  );
}