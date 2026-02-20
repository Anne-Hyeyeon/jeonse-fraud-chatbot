"use client"

import { MessageSquareText } from "lucide-react"

import { ChatWindow } from "@/components/ChatWindow"
import { ChatInput } from "@/components/ChatInput"
import { useChat } from "@/hooks/useChat"

const ChatPage = () => {
  const { messages, isLoading, sendMessage } = useChat()

  return (
    <div className="mx-auto flex h-dvh max-w-3xl flex-col bg-[#FAFAF8] shadow-sm lg:border-x lg:border-neutral-200/60">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-neutral-200/60 bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#2563EB]/10">
          <MessageSquareText className="size-5 text-[#2563EB]" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-[15px] font-semibold text-neutral-900 sm:text-base">
            전세사기 피해 상담 챗봇
          </h1>
          <p className="text-[11px] text-neutral-500 sm:text-xs">
            법률·제도 안내 서비스
          </p>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </main>

      <ChatInput onSend={sendMessage} disabled={isLoading} />

      <div className="border-t border-neutral-200/60 bg-white/60 py-1.5 text-center text-[11px] text-neutral-400 backdrop-blur-sm">
        made by 김첨지
      </div>
    </div>
  )
}

export default ChatPage
