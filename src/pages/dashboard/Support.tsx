import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const brandingQuestions = [
  {
    question: "How do I create a consistent brand identity?",
    answer:
      "Creating a consistent brand identity involves developing clear brand guidelines that define your visual elements (logo, colors, typography), tone of voice, and core messaging. Ensure these elements are applied consistently across all touchpoints, from your website to social media and marketing materials. Regular brand audits can help maintain consistency over time.",
    question_es: "¿Cómo creo una identidad de marca consistente?",
    answer_es:
      "Crear una identidad de marca consistente implica desarrollar directrices de marca claras que definan tus elementos visuales (logotipo, colores, tipografía), tono de voz y mensaje principal. Asegúrate de que estos elementos se apliquen de manera consistente en todos los puntos de contacto, desde tu sitio web hasta las redes sociales y materiales de marketing. Las auditorías de marca regulares pueden ayudar a mantener la consistencia con el tiempo.",
  },
  {
    question: "What elements should be included in my brand guidelines?",
    answer:
      "Comprehensive brand guidelines should include your logo specifications (size, spacing, variations), color palette with hex codes, typography hierarchy, image style guide, tone of voice, messaging framework, and examples of correct and incorrect usage. Consider also including templates for common applications and digital asset management instructions.",
    question_es: "¿Qué elementos deben incluirse en mis directrices de marca?",
    answer_es:
      "Las directrices de marca completas deben incluir las especificaciones de tu logotipo (tamaño, espaciado, variaciones), paleta de colores con códigos hex, jerarquía de tipografía, guía de estilo de imagen, tono de voz, marco de mensajería y ejemplos de uso correcto e incorrecto. Considera también incluir plantillas para aplicaciones comunes e instrucciones de gestión de activos digitales.",
  },
  {
    question: "How can I research my target audience effectively?",
    answer:
      "Effective audience research combines quantitative data (surveys, analytics) with qualitative insights (interviews, focus groups). Create detailed buyer personas based on demographics, psychographics, behaviors, and pain points. Analyze competitors' audiences and identify gaps. Use social listening tools to understand conversations around your industry and continuously refine your understanding as you gather more data.",
    question_es: "¿Cómo puedo investigar a mi audiencia objetivo de manera efectiva?",
    answer_es:
      "La investigación de audiencia efectiva combina datos cuantitativos (encuestas, análisis) con conocimientos cualitativos (entrevistas, grupos focales). Crea personas compradoras detalladas basadas en demografía, psicografía, comportamientos y puntos de dolor. Analiza las audiencias de tus competidores e identifica brechas. Utiliza herramientas de escucha social para entender las conversaciones en torno a tu industria y refinar continuamente tu comprensión a medida que recopilas más datos.",
  },
  {
    question: "What makes a logo memorable and effective?",
    answer:
      "A memorable logo is simple, distinctive, and relevant to your brand. It should work well at different sizes and in both color and monochrome. The most effective logos communicate your brand's personality and values while being timeless rather than trendy. Consider scalability, versatility, and how it will appear across different media and applications.",
    question_es: "¿Qué hace que un logotipo sea memorable y efectivo?",
    answer_es:
      "Un logotipo memorable es simple, distintivo y relevante para tu marca. Debe funcionar bien en diferentes tamaños y en color y monocromo. Los logotipos más efectivos comunican la personalidad y los valores de tu marca mientras son atemporales en lugar de estar de moda. Considera la escalabilidad, la versatilidad y cómo se verá en diferentes medios y aplicaciones.",
  },
  {
    question: "How do I choose the right color palette for my brand?",
    answer:
      "Select colors that reflect your brand personality and resonate with your target audience. Consider color psychology and industry conventions, but don't be afraid to differentiate. Ensure your palette has sufficient contrast for accessibility and includes primary, secondary, and accent colors. Test your palette across different applications and lighting conditions before finalizing.",
    question_es: "¿Cómo elijo la paleta de colores adecuada para mi marca?",
    answer_es:
      "Selecciona colores que reflejen la personalidad de tu marca y resuenen con tu audiencia objetivo. Considera la psicología del color y las convenciones de la industria, pero no tengas miedo de diferenciarte. Asegúrate de que tu paleta tenga un contraste suficiente para la accesibilidad e incluya colores primarios, secundarios y de acento. Prueba tu paleta en diferentes aplicaciones y condiciones de iluminación antes de finalizar.",
  },
  {
    question: "What typography best represents my brand values?",
    answer:
      "Choose typography that aligns with your brand personality—serif fonts often convey tradition and reliability, while sans-serif fonts suggest modernity and simplicity. Ensure readability across all sizes and platforms. Typically, limit your selection to 2-3 complementary fonts with clear hierarchy. Consider licensing requirements and availability across digital platforms.",
    question_es: "¿Qué tipografía representa mejor los valores de mi marca?",
    answer_es:
      "Elige una tipografía que se alinee con la personalidad de tu marca: las fuentes serif suelen transmitir tradición y confiabilidad, mientras que las fuentes sans-serif sugieren modernidad y simplicidad. Asegúrate de que la legibilidad sea buena en todos los tamaños y plataformas. Por lo general, limita tu selección a 2-3 fuentes complementarias con una jerarquía clara. Considera los requisitos de licencia y la disponibilidad en plataformas digitales.",
  },
  {
    question: "How can I differentiate my brand from competitors?",
    answer:
      "Differentiation starts with a thorough competitive analysis to identify gaps and opportunities. Develop a unique value proposition that highlights what you do differently and better. Consider your brand's story, personality, customer experience, or innovative features as potential differentiators. Consistency in communicating these differences across all touchpoints is key to establishing a distinct position.",
    question_es: "¿Cómo puedo diferenciar mi marca de los competidores?",
    answer_es:
      "La diferenciación comienza con un análisis competitivo exhaustivo para identificar brechas y oportunidades. Desarrolla una propuesta de valor única que destaque lo que haces de manera diferente y mejor. Considera la historia de tu marca, la personalidad, la experiencia del cliente o las características innovadoras como posibles diferenciadores. La consistencia en la comunicación de estas diferencias en todos los puntos de contacto es clave para establecer una posición distintiva.",
  },
  {
    question: "What content strategy works best for brand awareness?",
    answer:
      "An effective brand awareness content strategy combines educational content that addresses audience pain points, thought leadership that positions you as an industry expert, and storytelling that humanizes your brand. Diversify content formats (blog posts, videos, podcasts, infographics) and distribution channels. Focus on shareability and consistency in messaging rather than direct promotion.",
    question_es: "¿Qué estrategia de contenido funciona mejor para la conciencia de marca?",
    answer_es:
      "Una estrategia de contenido de conciencia de marca efectiva combina contenido educativo que aborda los puntos de dolor de la audiencia, liderazgo de pensamiento que te posiciona como experto en la industria y narración de historias que humaniza tu marca. Diversifica los formatos de contenido (publicaciones de blog, videos, podcasts, infografías) y canales de distribución. Enfócate en la compartibilidad y la consistencia en el mensaje en lugar de la promoción directa.",
  },
  {
    question: "How do I maintain brand consistency across platforms?",
    answer:
      "Maintain consistency by creating platform-specific guidelines that adapt your core brand elements appropriately for each channel while preserving your brand essence. Use templates and asset management systems to ensure teams have access to correct materials. Regular training and brand reviews help teams understand how to apply guidelines. Consider creating a brand governance structure for larger organizations.",
    question_es: "¿Cómo mantengo la consistencia de la marca en diferentes plataformas?",
    answer_es:
      "Mantén la consistencia creando directrices específicas de plataforma que adapten tus elementos de marca principales de manera adecuada para cada canal mientras preservas la esencia de tu marca. Utiliza plantillas y sistemas de gestión de activos para asegurarte de que los equipos tengan acceso a materiales correctos. La capacitación regular y las revisiones de marca ayudan a los equipos a entender cómo aplicar las directrices. Considera crear una estructura de gobernanza de marca para organizaciones más grandes.",
  },
  {
    question: "What metrics should I track to measure brand performance?",
    answer:
      "Key brand metrics include awareness (brand recall, recognition), perception (sentiment analysis, brand associations), engagement (social interactions, time on site), loyalty (repeat purchases, NPS score), and advocacy (referrals, reviews). Also track share of voice compared to competitors and the impact of brand building on conversion rates and customer acquisition costs.",
    question_es: "¿Qué métricas debo rastrear para medir el rendimiento de la marca?",
    answer_es:
      "Las métricas de marca clave incluyen conciencia (recuerdo de marca, reconocimiento), percepción (análisis de sentimiento, asociaciones de marca), compromiso (interacciones sociales, tiempo en el sitio), lealtad (compras repetidas, puntuación NPS) y defensa (referencias, reseñas). También rastrea la participación de voz en comparación con los competidores y el impacto de la construcción de marca en las tasas de conversión y los costos de adquisición de clientes.",
  },
]

export default function Support() {
  const navigate = useNavigate()
  const params = useParams()
  const questionId = typeof params.id === "string" ? Number.parseInt(params.id) : 0

  // Ensure the question ID is valid
  const validQuestionId = isNaN(questionId) || questionId < 0 || questionId >= brandingQuestions.length ? 0 : questionId

  const { question, answer, question_es, answer_es } = brandingQuestions[validQuestionId]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg min-h-screen mt-20">
      <button
        onClick={() => navigate("/dashboard/support")}
        className="flex items-center text-orange-500 mb-6 hover:text-orange-600 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a preguntas
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">{question}</h1>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{question_es}</h1>

      <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
        <p className="text-gray-700 leading-relaxed">{answer}</p>
        <p className="text-gray-700 leading-relaxed">{answer_es}</p>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold mb-4">Preguntas relacionadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {brandingQuestions
            .filter((_, index) => index !== validQuestionId)
            .slice(0, 4)
            .map((relatedQ, index) => (
              <Link
                to={`/dashboard/question/${brandingQuestions.findIndex((q) => q.question === relatedQ.question)}`}
                key={index}
                className="p-3 border border-gray-200 rounded-md hover:border-orange-300 hover:bg-orange-50 transition-colors"
              >
                <p className="text-gray-800">{relatedQ.question}</p>
                <p className="text-gray-800">{relatedQ.question_es}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}