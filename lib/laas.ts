import type { ILaaSResponse } from "@/types/chat"

const LAAS_ENDPOINT =
  "https://api-laas.wanted.co.kr/api/preset/v2/chat/completions"
const LAAS_HASH =
  "e2d085b3e8601f0d7fe37318cae5d461d4c6e6ddc013e25abf2e1831124622f4"

interface ILaaSMessage {
  role: "user" | "assistant"
  content: string
}

export const callLaaS = async (
  messages: ILaaSMessage[],
): Promise<string> => {
  const apiKey = process.env.LAAS_API_KEY
  if (!apiKey) {
    throw new Error("LAAS_API_KEY is not configured")
  }

  const response = await fetch(LAAS_ENDPOINT, {
    method: "POST",
    headers: {
      project: "LAAS_HYEYEON",
      apiKey,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      hash: LAAS_HASH,
      messages,
    }),
  })

  if (!response.ok) {
    throw new Error(`LaaS API error: ${response.status}`)
  }

  const data: ILaaSResponse = await response.json()
  return data.choices[0].message.content
}
