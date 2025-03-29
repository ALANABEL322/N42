import { create } from 'zustand'
import { toast } from 'react-hot-toast'

interface SupportMessage {
  id: number
  userMessage: string
  adminResponse?: string
  timestamp: string
}

interface SupportStore {
  messages: SupportMessage[]
  addMessage: (message: string) => void
  addAdminResponse: (messageId: number, response: string) => void
  deleteMessage: (messageId: number) => void
}

export const useSupportStore = create<SupportStore>((set) => ({
  messages: [],
  addMessage: (message) => {
    const newMessage: SupportMessage = {
      id: Date.now(),
      userMessage: message,
      timestamp: new Date().toISOString()
    }
    set((state) => ({
      messages: [...state.messages, newMessage]
    }))
    toast.success('Mensaje enviado')
  },
  addAdminResponse: (messageId, response) => {
    set((state) => ({
      messages: state.messages.map(message =>
        message.id === messageId
          ? { ...message, adminResponse: response }
          : message
      )
    }))
  },
  deleteMessage: (messageId) => {
    set((state) => ({
      messages: state.messages.filter(message => message.id !== messageId)
    }))
    toast.success('Mensaje eliminado')
  }
}))
