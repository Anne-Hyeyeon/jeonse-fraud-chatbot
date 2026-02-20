export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-3 px-4" role="status" aria-label="응답 작성 중">
      <div
        className="flex items-center gap-1.5 rounded-2xl bg-white px-5 py-3.5 shadow-sm"
      >
        <span className="size-2 animate-bounce rounded-full bg-neutral-400" />
        <span className="size-2 animate-bounce rounded-full bg-neutral-400 animation-delay-150" />
        <span className="size-2 animate-bounce rounded-full bg-neutral-400 animation-delay-300" />
      </div>
    </div>
  )
}
