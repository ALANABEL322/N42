import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ColorPaletteSelector } from "@/components/colorPaletteSelector/ColorPaletteSelector";

interface ProjectCreationFormProps {
  onSubmit?: (formData: ProjectFormData) => void
  className?: string
}

export interface ProjectFormData {
  brandName: string
  slogan: string
  mission: string
  vision: string
  values: string
  objective: string
  identityType: string
  targetAudience: string
  sector: string
  colorPalette: any
}

export default function CreateProject({ onSubmit, className }: ProjectCreationFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    brandName: "",
    slogan: "",
    mission: "",
    vision: "",
    values: "",
    objective: "",
    identityType: "logotipo",
    targetAudience: "",
    sector: "",
    colorPalette: null,
  })

  const handleChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
    };
    if (onSubmit) {
      onSubmit(projectData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-3xl space-y-6 mt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Crear proyecto</h1>
          <p className="text-muted-foreground">
            Para crear una identidad gráfica acorde a tus expectativas, necesitamos esta información.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-[#FFF5F5]">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">Nombre de la marca</Label>
                    <Input
                      id="brandName"
                      placeholder="Nombre de la marca"
                      value={formData.brandName}
                      onChange={(e) => handleChange("brandName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slogan">Slogan</Label>
                    <Input
                      id="slogan"
                      placeholder="Slogan"
                      value={formData.slogan}
                      onChange={(e) => handleChange("slogan", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mission">Misión</Label>
                    <Input
                      id="mission"
                      placeholder="Misión"
                      value={formData.mission}
                      onChange={(e) => handleChange("mission", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vision">Visión</Label>
                    <Input
                      id="vision"
                      placeholder="Visión"
                      value={formData.vision}
                      onChange={(e) => handleChange("vision", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="values">Valores</Label>
                    <Input
                      id="values"
                      placeholder="Valores"
                      value={formData.values}
                      onChange={(e) => handleChange("values", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objective">Objetivo</Label>
                    <Input
                      id="objective"
                      placeholder="Objetivo"
                      value={formData.objective}
                      onChange={(e) => handleChange("objective", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="identityType">Tipo de identidad</Label>
                    <Select
                      value={formData.identityType}
                      onValueChange={(value) => handleChange("identityType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="logotipo">Logotipo</SelectItem>
                        <SelectItem value="isotipo">Isotipo</SelectItem>
                        <SelectItem value="isologo">Isologo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Público objetivo</Label>
                    <Input
                      id="targetAudience"
                      placeholder="Público objetivo"
                      value={formData.targetAudience}
                      onChange={(e) => handleChange("targetAudience", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Input
                      id="sector"
                      placeholder="Sector"
                      value={formData.sector}
                      onChange={(e) => handleChange("sector", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <ColorPaletteSelector
              onSubmit={(paletteData) => {
                setFormData((prev) => ({ ...prev, colorPalette: paletteData }));
              }}
              onSkip={() => {
            
              }}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
           
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Omitir
            </Button>
            <Button type="submit" className="bg-[#E65100] hover:bg-[#D84315] text-white mb-10">
              Continuar
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}