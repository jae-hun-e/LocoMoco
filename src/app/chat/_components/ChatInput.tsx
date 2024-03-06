import { KeyboardEvent, Ref, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  sendMessage: () => void;
}

const ChatInput = forwardRef(({ sendMessage }: Props, inputRef: Ref<HTMLTextAreaElement>) => {
  const handleNewLine = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-50pxr z-50 flex w-[calc(100%-2.5rem)] flex-col justify-between gap-1 bg-layer-1">
      <Textarea
        ref={inputRef}
        onKeyDown={handleNewLine}
      />
      <div className="flex select-none justify-between">
        <p className="ml-1 text-gray-400">Shift + Enter로 띄워쓰기</p>
        <div className="flex gap-6">
          <Button onClick={() => console.log()}>Photo</Button>
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';
export default ChatInput;
