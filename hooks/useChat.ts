"use client"

import { useState, useCallback } from "react"

import type { IMessage, IChatRequest } from "@/types/chat"

const WELCOME_CONTENT = `보증금 안 주는 집주인들 지옥가라! 👺🔥
안녕하세요! 전세사기 관련 법률·제도를 안내해 드리는 챗봇이에요.
(변호사는 아니지만 열정만큼은 변호사급입니다 💪)

아래처럼 질문해 보세요:
• "집주인이 보증금을 안 돌려줘요"
• "전세사기 피해 지원금 받을 수 있나요?"
• "경매 들어갔는데 어떡하죠?"`

const INITIAL_MESSAGE: IMessage = {
  id: "welcome",
  role: "assistant",
  content: WELCOME_CONTENT,
  timestamp: new Date(),
}

export const useChat = () => {
  const [messages, setMessages] = useState<IMessage[]>([INITIAL_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || isLoading) return

      const userMessage: IMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        const history: IChatRequest["messages"] = [
          ...messages
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
          { role: "user" as const, content: trimmed },
        ]

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        })

        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status}`)
        }

        const data = await response.json()

        const assistantMessage: IMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.content,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch {
        const errorMessage: IMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "앗, 집주인한테 화나다가 서버도 잠깐 쉬러 갔나 봐요 😅\n잠시 후 다시 시도해 주세요!",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [messages, isLoading],
  )

  return { messages, isLoading, sendMessage }
}
