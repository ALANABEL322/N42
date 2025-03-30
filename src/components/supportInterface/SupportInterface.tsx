import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

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

export default function SupportInterface() {
  const navigate = useNavigate()

  const handleAccept = () => {
    alert("Thank you for using our support system!")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Support</h1>
      <p className="text-gray-600 mb-6">To help you, please select one of the following questions:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {brandingQuestions.map((question, index) => (
          <Link
            to={`/question/${index}`}
            key={index}
            className="border border-orange-300 rounded-md p-4 text-center text-orange-500 hover:bg-orange-50 transition-colors"
          >
            {question}
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 transition-colors w-48"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="px-6 py-3 bg-orange-500 rounded-md text-white hover:bg-orange-600 transition-colors w-48"
          onClick={handleAccept}
        >
          Accept
        </button>
      </div>
    </div>
  )
}

