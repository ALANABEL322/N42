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
    if (window.confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      deleteMessage(messageId)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg min-h-screen mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Soporte</h1>
      
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
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Eliminar mensaje"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">Usuario</h3>
                <p className="text-gray-600">{new Date(message.timestamp).toLocaleString()}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs mr-5 ${
                message.adminResponse ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {message.adminResponse ? "Respondido" : "Pendiente"}
              </span>
            </div>
            <p className="text-gray-800">{message.userMessage}</p>
            {message.adminResponse && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <h4 className="font-semibold mb-1">Respuesta del Administrador</h4>
                <p className="text-gray-700">{message.adminResponse}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Responder Mensaje</h2>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={4}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setSelectedMessage(null)
                  setResponse("")
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleResponse(selectedMessage)}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Enviar Respuesta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
