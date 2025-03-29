import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Define the branding questions
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

  const handleQuestionSelect = (index: number) => {
    setSelectedQuestion(index)
    navigate(`/dashboard/question/${index}`)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg min-h-screen mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Soporte</h1>
      <p className="text-gray-600 mb-6">Selecciona una pregunta para ver la respuesta detallada:</p>

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
  )
}
