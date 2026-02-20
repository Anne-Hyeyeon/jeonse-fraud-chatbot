export interface IMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface IChatRequest {
  messages: Pick<IMessage, "role" | "content">[]
}

export interface ILaaSResponse {
  choices: {
    message: {
      role: string
      content: string
    }
  }[]
}
