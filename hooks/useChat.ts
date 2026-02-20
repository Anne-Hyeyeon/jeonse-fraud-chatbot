"use client"

import { useState, useCallback } from "react"

import type { IMessage, IChatRequest } from "@/types/chat"

const INITIAL_MESSAGE: IMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "보증금 안 주는 집주인들 지옥가라! 👺\n안녕하세요. 전세사기 피해 관련 법률·제도를 안내해 드리는 챗봇입니다.\n궁금한 점을 자유롭게 질문해 주세요.",
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
            "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
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
