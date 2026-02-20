"use client"

import { useState, useCallback, useMemo } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"

const PLACEHOLDERS = [
  "보증금 돌려받는 법 알려주세요…",
  "집주인이 잠수탔어요 어떡하죠…",
  "전세사기 당한 것 같은데요…",
  "내 보증금은 어디로 간 걸까요…",
  "임차권등기명령이 뭔가요…",
  "여기에 억울한 사연을 풀어놓으세요…",
]

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
    <footer className="sticky bottom-0 z-10 border-t border-neutral-200/60 bg-white/70 px-4 py-3 backdrop-blur-xl sm:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="mx-auto flex max-w-3xl items-end gap-3"
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
          className="min-h-[44px] max-h-32 flex-1 resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[15px] placeholder:text-neutral-400 focus:border-[#FF6B6B]/50 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 disabled:opacity-50"
          aria-label="채팅 메시지 입력"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !value.trim()}
          className="size-11 shrink-0 rounded-full bg-[#FF6B6B] text-white shadow-md transition-all hover:bg-[#FF5252] hover:shadow-lg disabled:opacity-40"
          aria-label="메시지 전송"
        >
          <Send className="size-5" />
        </Button>
      </form>
    </footer>
  )
}
