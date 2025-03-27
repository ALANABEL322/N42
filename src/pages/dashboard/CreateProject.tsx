import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ColorPaletteSelector } from "@/components/colorPaletteSelector/ColorPaletteSelector";
import Modal from "react-modal";
import { useFormData } from "@/hooks/useFormData";

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '90%',
    padding: '2rem',
    border: 'none',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }
};

interface ProjectCreationFormProps {
  onSubmit?: (formData: any) => void;
  className?: string;
}

export default function CreateProject({ onSubmit, className }: ProjectCreationFormProps) {
  const { formData, updateField, updateColorPalette } = useFormData();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextStep = (data?: any) => {
    if (currentStep === 2 && data) {
      updateColorPalette({
        selectedPalette: data.selectedPalette,
        typography: data.typography,
        graphicDescription: data.graphicDescription
      });
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const submitForm = () => {
    console.log('Final form submission data:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 3) {
      submitForm();
    } else {
      handleNextStep();
    }
  };

  const handleIdentityOption = (option: string) => {
    updateField("identityType", option);
  };

  if (currentStep === 1) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-20">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Paso 1: Información del Proyecto</h2>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="brandName">Nombre de la Marca</Label>
                  <Input
                    id="brandName"
                    value={formData.brandName}
                    onChange={(e) => updateField('brandName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slogan">Slogan</Label>
                  <Input
                    id="slogan"
                    value={formData.slogan}
                    onChange={(e) => updateField('slogan', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="mission">Misión</Label>
                  <Input
                    id="mission"
                    value={formData.mission}
                    onChange={(e) => updateField('mission', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="vision">Visión</Label>
                  <Input
                    id="vision"
                    value={formData.vision}
                    onChange={(e) => updateField('vision', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="values">Valores</Label>
                  <Input
                    id="values"
                    value={formData.values}
                    onChange={(e) => updateField('values', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="objective">Objetivo</Label>
                  <Input
                    id="objective"
                    value={formData.objective}
                    onChange={(e) => updateField('objective', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="targetAudience">Público Objetivo</Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => updateField('targetAudience', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="sector">Sector</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => updateField('sector', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="moda">Moda</SelectItem>
                      <SelectItem value="alimentos">Alimentos</SelectItem>
                      <SelectItem value="servicios">Servicios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" onClick={handlePreviousStep} disabled={currentStep === 1}>
                  Anterior
                </Button>
                <Button type="submit">Continuar</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 2) {
    return (
      <ColorPaletteSelector
        onSubmit={(data) => handleNextStep(data)}
        className={className}
      />
    );
  }
  if (currentStep === 3) {
    return (
      <>
        <div className="container space-y-6 mt-20 text-center">
          <h2 className="text-2xl font-bold">Paso 3: Identidad Gráfica</h2>
          <p className="text-muted-foreground">
            Revisa tu selección de identidad gráfica:
          </p>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="mt-6"
          >
            Ver resumen de identidad gráfica
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999]"
          style={{ 
            display: isModalOpen ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-[10000]"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 overflow-hidden z-[10001]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Resumen de Identidad Gráfica</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-8">
                <div className="bg-[#F6EEEE] rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-4">Información General del Proyecto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Nombre de la Marca</p>
                        <p className="text-lg font-semibold">{formData.brandName || 'No especificado'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Sector</p>
                        <p className="text-lg font-semibold">{formData.sector || 'No especificado'}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Público Objetivo</p>
                        <p className="text-lg font-semibold">{formData.targetAudience || 'No especificado'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Tipo de Identidad</p>
                        <p className="text-lg font-semibold capitalize">{formData.identityType || 'No especificado'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-4">Especificaciones de Diseño</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="border rounded-lg p-4 flex flex-col items-center bg-[#F6EEEE]"
                    >
                      <h4 className="font-semibold mb-4 text-center">Paleta de Colores</h4>
                      {formData.colorPalette?.selectedPalette && (
                        <div className="flex flex-col items-center space-y-3">
                          <div 
                            className="w-20 h-20 rounded-full shadow-md border-2 border-gray-200"
                            style={{ backgroundColor: formData.colorPalette.selectedPalette.color }}
                          />
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Nombre</p>
                            <p className="font-medium">{formData.colorPalette.selectedPalette.name}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Código HEX</p>
                            <p className="font-mono font-medium">
                              {formData.colorPalette.selectedPalette.color}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="border rounded-lg p-4 flex flex-col items-center bg-[#F6EEEE]"
                    >
                      <h4 className="font-semibold mb-4 text-center">Tipografía</h4>
                      <div className="flex flex-col items-center space-y-3">
                        <div className="text-5xl font-sans" style={{
                          fontFamily: formData.colorPalette?.typography === 'roboto' ? 'Roboto' :
                          formData.colorPalette?.typography === 'montserrat' ? 'Montserrat' :
                          formData.colorPalette?.typography === 'poppins' ? 'Poppins' :
                          formData.colorPalette?.typography === 'inter' ? 'Inter' : 'inherit'
                        }}>
                          Aa
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Familia tipográfica</p>
                          <p className="font-medium capitalize">
                            {formData.colorPalette?.typography || 'No seleccionada'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                   </div>  
                </div>

                {/* Botones de Acción */}
                <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="outline"
                className="min-w-[120px]"
                onClick={() => {
                  setIsModalOpen(false);
                  handlePreviousStep();
                  }}
              >
                Anterior
              </Button>
              <Button
                className="min-w-[120px]"
                onClick={() => {
                    setIsModalOpen(false);
                    submitForm();
                  }}
                  disabled={!formData.colorPalette?.selectedPalette || !formData.colorPalette?.typography}
                >
                  Finalizar
                </Button>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </>
    );
  }

  return null;
}