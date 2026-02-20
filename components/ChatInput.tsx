"use client"

import { useState, useCallback, useMemo } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"

const PLACEHOLDERS = [
  "궁금한 점을 질문해 주세요",
  "전세사기 피해 지원제도가 궁금해요",
  "피해자 인정 절차를 알고 싶어요",
  "긴급 주거지원 신청은 어떻게 하나요?",
  "경공매 유예 신청 방법이 궁금해요",
  "필요한 제출서류를 알려주세요",
];

interface IChatInputProps {
  onSend: (message: string) => void
  disabled: boolean
}

export const ChatInput = ({ onSend, disabled }: IChatInputProps) => {
  const [value, setValue] = useState("")
  const placeholder = useMemo(
    () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)],
    [],
  )

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
  }, [value, disabled, onSend])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  return (
    <footer className="sticky bottom-0 z-10 border-t border-neutral-200/60 bg-white/70 px-3 py-2.5 backdrop-blur-xl sm:px-5">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="flex items-end gap-2 sm:gap-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          메시지 입력
        </label>
        <textarea
          id="chat-input"
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-11 max-h-32 flex-1 resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-400/20 disabled:opacity-50 sm:text-base"
          aria-label="채팅 메시지 입력"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !value.trim()}
          className="size-10 shrink-0 rounded-full bg-red-400 text-white shadow-md transition-all hover:bg-red-500 hover:shadow-lg disabled:opacity-40 sm:size-11"
          aria-label="메시지 전송"
        >
          <Send className="size-5" />
        </Button>
      </form>
    </footer>
  )
}
