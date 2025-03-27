import { useState } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface ColorPaletteSelectorProps {
  onSubmit?: (data: PaletteSelectionData) => void
  onSkip?: () => void
  className?: string
}

export interface PaletteSelectionData {
  selectedPalette: string
  typography: string
  graphicDescription: string
}

interface ColorOption {
  id: string
  name: string
  color: string
}

export function ColorPaletteSelector({ onSubmit, onSkip, className }: ColorPaletteSelectorProps) {
  const colorOptions: ColorOption[] = [
    { id: "ia", name: "IA", color: "#FFFFFF" },
    { id: "cian", name: "Cian", color: "#E0F7FA" },
    { id: "magenta", name: "Magenta", color: "#FCE4EC" },
    { id: "amarillo", name: "Amarillo", color: "#FFFDE7" },
    { id: "negro", name: "Negro", color: "#0D0D0D" },
  ]

  const colorBorders: Record<string, string> = {
    ia: "#E65100",
    cian: "#26C6DA",
    magenta: "#EC407A",
    amarillo: "#FFD700",
    negro: "#000000", 
  }

  const [formData, setFormData] = useState<PaletteSelectionData>({
    selectedPalette: "ia",
    typography: "",
    graphicDescription: "",
  })

  const [selectedColor, setSelectedColor] = useState<string>("ia")

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId)
    setFormData((prev) => ({
      ...prev,
      selectedPalette: colorId,
    }))
  }

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-3xl mx-auto ${className || ""}`}
    >
      <Card className="bg-[#FFF5F5] border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-16">
            <div>
              <h2 className="text-xl font-bold mb-5">¿Qué paleta de colores le gustaría utilizar?</h2>
              <p className="text-sm text-muted-foreground mb-4">Estos mismos los puede editar después</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {colorOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() => handleColorSelect(option.id)}
                      className={`
                        w-full h-24 rounded-lg flex items-center justify-center
                        border-1 transition-all duration-200
                        ${selectedColor === option.id ? "border-solid" : "border-transparent"}
                        focus:outline-none focus:ring-1 focus:ring-offset-1
                      `}
                      style={{
                        backgroundColor: option.color,
                        borderColor: selectedColor === option.id ? colorBorders[option.id] : 'transparent',
                      }}
                      aria-label={`Select ${option.name} color palette`}
                    >
                      {selectedColor === option.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          style={{ backgroundColor: colorBorders[option.id] }}
                          className="absolute top-2 right-2 rounded-full p-0.5 text-white"
                        >
                          <Check className="h-3 w-3" />
                        </motion.div>
                      )}
                      <span className="text-gray-600 font-medium">{option.name}</span>
                    </button>
                    <div className="text-center text-sm mt-1 text-gray-600">{option.name}</div>
                  </motion.div>
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-3">Haga click en los colores para poder editarlos</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="typography" className="block text-sm font-medium">
                ¿Qué tipografía le gustaría utilizar?
              </label>
              <Select
                value={formData.typography}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, typography: value }))}
              >
                <SelectTrigger id="typography" className="w-full bg-white">
                  <SelectValue placeholder="Ejemplo: comic sans o sugerir con IA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comic-sans">Comic Sans</SelectItem>
                  <SelectItem value="helvetica">Helvetica</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="montserrat">Montserrat</SelectItem>
                  <SelectItem value="ia-suggestion">Sugerir con IA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">
          Describa detalladamente que elemento debe tener la identidad gráfica
        </h2>
        <Textarea
          id="graphicDescription"
          placeholder="Ejemplo: una silueta de una persona con sombrero levantando la mano."
          className="min-h-[120px] bg-white"
          value={formData.graphicDescription}
          onChange={(e) => setFormData((prev) => ({ ...prev, graphicDescription: e.target.value }))}
        />
      </div>
    </motion.div>
  )
}
