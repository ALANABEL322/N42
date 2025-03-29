import { useParams, useNavigate } from "react-router-dom"

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
      "Selecciona colores que reflejen la personalidad de tu marca y resuenen con tu audiencia objetivo. Considera la psicología del color y las convenciones de la industria, pero no tengas miedo de diferenciarte. Asegúrate de que tu paleta tenga suficiente contraste para la accesibilidad e incluya colores primarios, secundarios y de acento. Prueba tu paleta en diferentes aplicaciones y condiciones de iluminación antes de finalizar.",
  },
  {
    question: "What typography best represents my brand values?",
    answer:
      "Typography should reflect your brand's personality - clean and modern for tech brands, elegant and traditional for luxury brands, playful and casual for lifestyle brands. Consider readability, scalability, and how well the typeface works in both headings and body text. Test different typefaces in real-world scenarios to ensure they maintain your brand's voice.",
    question_es: "¿Qué tipografía mejor representa los valores de mi marca?",
    answer_es:
      "La tipografía debe reflejar la personalidad de tu marca - limpia y moderna para marcas tecnológicas, elegante y tradicional para marcas de lujo, juguetona y casual para marcas de estilo de vida. Considera la legibilidad, la escalabilidad y cómo funciona la tipografía tanto en encabezados como en texto corporal. Prueba diferentes tipografías en escenarios del mundo real para asegurarte de que mantengan la voz de tu marca.",
  },
  {
    question: "How can I differentiate my brand from competitors?",
    answer:
      "Differentiation involves identifying unique value propositions, creating distinct visual identities, and developing consistent messaging that highlights what makes your brand special. Research your competitors thoroughly and find gaps in their offerings that you can fill. Focus on authenticity and building genuine connections with your audience.",
    question_es: "¿Cómo puedo diferenciar mi marca de los competidores?",
    answer_es:
      "La diferenciación implica identificar propuestas de valor únicas, crear identidades visuales distintivas y desarrollar un mensaje consistente que destaque lo que hace especial a tu marca. Investiga a tus competidores a fondo y encuentra brechas en sus ofertas que puedas llenar. Enfócate en la autenticidad y en construir conexiones genuinas con tu audiencia.",
  },
  {
    question: "What content strategy works best for brand awareness?",
    answer:
      "A successful brand awareness strategy combines consistent content themes, engaging storytelling, and active social media presence. Create content that educates, entertains, and inspires your audience. Use a mix of formats (blogs, videos, infographics) and maintain a regular posting schedule to keep your brand top of mind.",
    question_es: "¿Qué estrategia de contenido funciona mejor para la conciencia de marca?",
    answer_es:
      "Una estrategia exitosa de conciencia de marca combina temas de contenido consistentes, narración atractiva y presencia activa en las redes sociales. Crea contenido que eduque, entretenga e inspire a tu audiencia. Usa una mezcla de formatos (blogs, videos, infografías) y mantén un horario de publicación regular para mantener tu marca en la mente de las personas.",
  },
  {
    question: "How do I maintain brand consistency across platforms?",
    answer:
      "Maintain brand consistency by using the same visual elements, tone of voice, and messaging across all platforms. Create platform-specific guidelines while keeping core brand elements intact. Regular audits and training for content creators help ensure consistent brand representation.",
    question_es: "¿Cómo mantengo la consistencia de la marca en todas las plataformas?",
    answer_es:
      "Mantén la consistencia de la marca usando los mismos elementos visuales, tono de voz y mensaje en todas las plataformas. Crea directrices específicas para cada plataforma mientras mantienes los elementos principales de la marca. Las auditorías regulares y el entrenamiento para los creadores de contenido ayudan a garantizar una representación consistente de la marca.",
  },
  {
    question: "What metrics should I track to measure brand performance?",
    answer:
      "Key brand metrics include brand awareness (reach, impressions), brand perception (NPS, sentiment analysis), brand loyalty (repeat customers, retention rate), and brand value (brand equity, market share). Use a combination of quantitative and qualitative metrics to get a comprehensive view of your brand's performance.",
    question_es: "¿Qué métricas debo seguir para medir el rendimiento de la marca?",
    answer_es:
      "Las métricas clave de la marca incluyen conciencia de marca (alcance, impresiones), percepción de marca (NPS, análisis de sentimiento), lealtad de marca (clientes repetidores, tasa de retención) y valor de marca (equidad de marca, cuota de mercado). Usa una combinación de métricas cuantitativas y cualitativas para obtener una visión completa del rendimiento de tu marca.",
  },
]

export default function SupportUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const questionIndex = id ? parseInt(id) : null

  if (questionIndex === null || questionIndex < 0 || questionIndex >= brandingQuestions.length) {
    navigate('/dashboard/support')
    return null
  }

  const question = brandingQuestions[questionIndex]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-20">
      <div className="flex items-center mb-8 ">
        <button
          onClick={() => navigate('/dashboard/support')}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors mr-4"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{question.question_es}</h1>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Respuesta:</h2>
          <p className="text-gray-600">{question.answer_es}</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pregunta Original:</h2>
          <p className="text-gray-600">{question.question}</p>
        </div>
      </div>
    </div>
  )
}