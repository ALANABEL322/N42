import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ColorPaletteSelector } from "@/components/colorPaletteSelector/ColorPaletteSelector";
import Modal from "react-modal";
import google from '../../assets/imgModal/google.webp'
import nike from '@/assets/imgModal/nike.png'
import carrefour from '@/assets/imgModal/carrefour.png'
import burguerKing from '../../assets/imgModal/burguerking.png'

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
  colorPalette?: any
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
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handleChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

   const submitForm = (paletteData?: any) => {
    const projectData = {
      ...formData,
      colorPalette: paletteData || formData.colorPalette
    };
    if (onSubmit) {
      onSubmit(projectData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };


  const handleIdentityOption = (option: string) => {
    handleChange("identityType", option);
    setIsModalOpen(false);
  };

  const handleColorPaletteSubmit = (paletteData: any) => {
    setFormData(prev => ({ ...prev, colorPalette: paletteData }));
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
                        <SelectItem value="imagotipo">Imagotipo</SelectItem>
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
              onSubmit={handleColorPaletteSubmit}
              onSkip={() => submitForm()} 
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => submitForm()}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Omitir
            </Button>
            <Button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Continuar
            </Button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Opciones de Identidad"
        style={customStyles}
        ariaHideApp={true}
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        preventScroll={true}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-content relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-[-1.3rem]  right-[-1.3rem]  p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-700">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="flex items-start mb-6">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-6 h-6">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Construye tu Identidad Visual</h2>
              <p className="text-gray-600 mt-1">Selecciona el estilo que mejor represente tu marca</p>
            </div>
          </div>


          <div className="space-y-3">
            <button
              className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-start group focus:outline-none focus:ring-2 focus:ring-primary/50"
              onClick={() => handleIdentityOption("logotipo")}
            >
              <div className="bg-blue-100 p-1 rounded-lg mr-4">
                <img src={google} alt="image Logotipo" className="w-10 h-10" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary">Logotipo</h3>
                <p className="text-gray-600 text-sm mt-1">Texto estilizado que representa tu marca</p>
              </div>
            </button>
            
            <button
              className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-start group focus:outline-none focus:ring-2 focus:ring-primary/50"
              onClick={() => handleIdentityOption("isotipo")}
            >
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
              <img src={nike} alt="image isotipo" className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary">Isotipo</h3>
                <p className="text-gray-600 text-sm mt-1">Símbolo gráfico sin texto que identifica tu marca</p>
              </div>
            </button>

            <button
              className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-start group focus:outline-none focus:ring-2 focus:ring-primary/50"
              onClick={() => handleIdentityOption("isologo")}
            >
              <div className="bg-orange-100 p-2 rounded-lg mr-4">
                <img src={carrefour} alt="image isologo" className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary">Isologo</h3>
                <p className="text-gray-600 text-sm mt-1">Texto y símbolo integrados en un mismo elemento</p>
              </div>
            </button>
            
            <button
              className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-start group focus:outline-none focus:ring-2 focus:ring-primary/50"
              onClick={() => handleIdentityOption("isologo")}
            >
              <div className="bg-orange-100 p-2 rounded-lg mr-4">
                <img src={burguerKing} alt="image isologo" className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary">Isologo</h3>
                <p className="text-gray-600 text-sm mt-1">Texto y símbolo integrados en un mismo elemento</p>
              </div>
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}