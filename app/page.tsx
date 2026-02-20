"use client"

import { Shield } from "lucide-react"

import { ChatWindow } from "@/components/ChatWindow"
import { ChatInput } from "@/components/ChatInput"
import { useChat } from "@/hooks/useChat"

const ChatPage = () => {
  const { messages, isLoading, sendMessage } = useChat()

  return (
    <div className="mx-auto flex h-dvh max-w-3xl flex-col bg-stone-50 shadow-sm lg:border-x lg:border-neutral-200/60">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-neutral-200/60 bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-red-400/10">
          <Shield className="size-5 text-red-400" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-neutral-900 sm:text-base">
            전세사기 피해 상담 챗봇
          </h1>
          <p className="text-xs text-neutral-500">
            보증금 지키미 🛡️
          </p>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </main>

      <ChatInput onSend={sendMessage} disabled={isLoading} />

      <div className="border-t border-neutral-200/60 bg-white/60 py-1.5 text-center text-xs text-neutral-400 backdrop-blur-sm">
        made by 김첨지
      </div>
    </div>
  )
}

export default ChatPage
