"use client"

import { useEffect, useRef } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "@/components/MessageBubble"
import { TypingIndicator } from "@/components/TypingIndicator"
import type { IMessage } from "@/types/chat"

interface IChatWindowProps {
  messages: IMessage[]
  isLoading: boolean
}

export const ChatWindow = ({ messages, isLoading }: IChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <ScrollArea className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-4 py-6" role="log" aria-label="채팅 메시지">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </ScrollArea>
  )
}
