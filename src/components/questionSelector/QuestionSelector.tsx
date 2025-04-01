import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSupportStore } from "../../store/supportStore"
import { motion } from "framer-motion"
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { toastStyles } from '../ui/sonner'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
} from '../ui/alert-dialog'

const brandingQuestions = [
  "How do I create a consistent brand identity?",
  "What elements should be included in my brand guidelines?",
  "How can I research my target audience effectively?",
  "What makes a logo memorable and effective?",
  "How do I choose the right color palette for my brand?",
  "What typography best represents my brand values?",
  "How can I differentiate my brand from competitors?",
  "What content strategy works best for brand awareness?",
  "How do I maintain brand consistency across platforms?",
  "What metrics should I track to measure brand performance?",
]

export default function QuestionSelector() {
  const navigate = useNavigate()
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const { addMessage, messages, deleteMessage } = useSupportStore()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null)

  const handleQuestionSelect = (index: number) => {
    setSelectedQuestion(index)
    navigate(`/dashboard/support/question/${index}`)
  }

  const handleSubmit = () => {
    if (message.trim()) {
      addMessage(message)
      setMessage("")
      toast.success('Message sent successfully!', {
        className: toastStyles.userMessage.background,
        duration: 5000,
      })
    }
  }

  const handleDeleteMessage = (messageId: number) => {
    setOpenDeleteDialog(true)
    setMessageToDelete(messageId)
  }

  const confirmDelete = () => {
    if (messageToDelete !== null) {
      deleteMessage(messageToDelete)
      toast.success('Message deleted successfully!', {
        className: toastStyles.userMessage.background,
        duration: 5000,
      })
      setOpenDeleteDialog(false)
      setMessageToDelete(null)
    }
  }

  const cancelDelete = () => {
    setOpenDeleteDialog(false)
    setMessageToDelete(null)
  }

  return (
    <div className="bg-white rounded-lg min-h-screen mt-20 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:ml-[17rem] 2xl:ml-[30rem] flex-1">
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Support</h1>
        <p className="text-gray-600 mb-6">Select a question to view the detailed answer:</p>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {brandingQuestions.map((question, index) => (
            <div
              key={index}
              className={`p-4 border rounded-md cursor-pointer transition-colors ${
                selectedQuestion === index ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
              }`}
              onClick={() => handleQuestionSelect(index)}
            >
              <p className="text-gray-800">{question}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Send Message to Support</h2>
        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            Send Message
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Support Responses</h2>
        <div className="space-y-6">
          {messages
            .filter(msg => msg.adminResponse)
            .map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative"
              >
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  className="absolute mt-2 top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Support Response</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className="px-2 mr-4 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                    Responded
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2">Your Message:</h4>
                    <p className="text-gray-600">{message.userMessage}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2">Support Response:</h4>
                    <p className="text-gray-600">{message.adminResponse}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          {messages.filter(msg => msg.adminResponse).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No support responses yet</p>
              <p className="mt-2 text-sm">Send a message and receive a response from the support team</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
