import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "../../components/ui/card";

const loadingMessages = [
  "Analizando la esencia de tu marca...",
  "Creando una paleta de colores única...",
  "Definiendo la tipografía perfecta...",
  "Generando elementos gráficos coherentes...",
  "Creando una identidad visual consistente...",
  "Optimizando la experiencia visual...",
  "Generando la identidad gráfica final..."
];

const BrandIdentityLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timePerMessage = Math.floor(15000 / loadingMessages.length);
    
    const timer = setTimeout(() => {
      setCurrentMessage((prev) => {
        const next = (prev + 1) % loadingMessages.length;
        return next;
      });
    }, timePerMessage);

    const progressTimer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(progressTimer);
    };
  }, [currentMessage, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h2
          className="text-3xl font-bold mb-8 text-orange-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Generando Identidad Gráfica
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessage}
            className="text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessages[currentMessage]}
          </motion.p>
        </AnimatePresence>

        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-12 h-12 bg-orange-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BrandIdentityLoader;
