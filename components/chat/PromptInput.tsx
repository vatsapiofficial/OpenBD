import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function PromptInput({
  value,
  onValueChange,
  onSubmit,
}: {
  value: string;
  onValueChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t">
      <div className="relative">
        <Textarea
          value={value}
          onChange={onValueChange}
          placeholder="Type your message here..."
          className="pr-16"
        />
        <Button
          type="submit"
          className="absolute top-1/2 right-3 -translate-y-1/2"
        >
          Send
        </Button>
      </div>
    </form>
  );
}