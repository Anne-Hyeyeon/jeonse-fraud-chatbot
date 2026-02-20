import { cn } from "@/lib/utils"
import type { IMessage } from "@/types/chat"

interface IMessageBubbleProps {
  message: IMessage
}

export const MessageBubble = ({ message }: IMessageBubbleProps) => {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex w-full px-4",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[80%] whitespace-pre-wrap rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed sm:max-w-[70%]",
          isUser
            ? "rounded-br-md bg-[#2D2D2D] text-white"
            : "rounded-bl-md bg-white text-neutral-800 shadow-sm",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
