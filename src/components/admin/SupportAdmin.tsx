import { useState } from "react"
import { useSupportStore } from "../../store/supportStore"
import { Trash2 } from 'lucide-react'

export default function SupportAdmin() {
  const { messages, addAdminResponse, deleteMessage } = useSupportStore()
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [response, setResponse] = useState("")

  const handleResponse = (messageId: number) => {
    if (response.trim()) {
      addAdminResponse(messageId, response)
      setResponse("")
      setSelectedMessage(null)
    }
  }

  const handleDeleteMessage = (messageId: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(messageId)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg min-h-screen mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Support Panel</h1>
      
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer relative"
            onClick={() => setSelectedMessage(message.id)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteMessage(message.id)
              }}
              className="absolute mt-2 top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete message"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">User Message</h3>
                <p className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                Responded
              </span>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Message Content:</h4>
                <p className="text-gray-600">{message.userMessage}</p>
              </div>
              {message.adminResponse && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">Admin Response:</h4>
                  <p className="text-gray-600">{message.adminResponse}</p>
                </div>
              )}
              {!message.adminResponse && selectedMessage === message.id && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">Write Response:</h4>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={4}
                  />
                  <button
                    onClick={() => handleResponse(message.id)}
                    className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Send Response
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
