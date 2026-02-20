"use client"

import { Shield } from "lucide-react"

import { ChatWindow } from "@/components/ChatWindow"
import { ChatInput } from "@/components/ChatInput"
import { useChat } from "@/hooks/useChat"

const ChatPage = () => {
  const { messages, isLoading, sendMessage } = useChat()

  return (
    <div className="flex h-dvh flex-col bg-[#FAFAF8]">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-neutral-200/60 bg-white/80 px-4 py-3.5 backdrop-blur-xl sm:px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#FF6B6B]/10">
          <Shield className="size-5 text-[#FF6B6B]" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-neutral-900">
            전세사기 피해 상담 챗봇
          </h1>
          <p className="text-xs text-neutral-500">
            법률·제도 안내 서비스
          </p>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </main>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  )
}

export default ChatPage
