import { NextRequest, NextResponse } from "next/server"

import { callLaaS } from "@/lib/laas"

export const POST = async (request: NextRequest) => {
  try {
    const { messages } = await request.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages 배열이 필요합니다." },
        { status: 400 },
      )
    }

    const content = await callLaaS(messages)

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
