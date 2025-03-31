import React, { useState } from 'react';
import Modal from 'react-modal';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import IAcolor from "../../assets/imgIA/500_333-removebg-preview.webp";
import { toast } from "react-hot-toast";

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
    maxWidth: '600px',
    width: '90%',
    padding: '2rem',
    border: 'none',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }
};

interface IASelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
}

const generateRandomColor = (): string => {
  const colorRanges = [
    { min: 0, max: 30 },
    { min: 30, max: 90 },
    { min: 90, max: 150 },
    { min: 150, max: 210 },
    { min: 210, max: 270 },
    { min: 270, max: 330 },
  ];

  const range = colorRanges[Math.floor(Math.random() * colorRanges.length)];
  const hue = Math.floor(Math.random() * (range.max - range.min) + range.min);
  const saturation = Math.floor(Math.random() * 40 + 60);
  const lightness = Math.floor(Math.random() * 20 + 30);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default function IASelectorModal({ isOpen, onClose, onSelect }: IASelectorModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectWithDelay = () => {
    setIsGenerating(true);
    
    const toastId = toast.loading('Generating color with AI...');

    setTimeout(() => {
      const randomColor = generateRandomColor();
      
      toast.dismiss(toastId);
      toast.success('Color generated successfully!');

      onClose();
      onSelect(randomColor);
      setIsGenerating(false);
    }, 5000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="AI Color Palette Selector"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-[#FFF5F5] border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Artificial Intelligence</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Use artificial intelligence to generate a unique and distinctive color palette
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-48 h-48">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={IAcolor}
                      alt="AI Color Palette"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>
                </div>

                <Button
                  onClick={handleSelectWithDelay}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Create color palette'}
                </Button>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
                  Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Modal>
  );
}
