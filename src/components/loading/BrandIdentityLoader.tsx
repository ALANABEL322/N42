import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";

const loadingMessages = [
  "Analyzing your brand's essence...",
  "Creating a unique color palette...",
  "Defining the perfect typography...",
  "Generating consistent graphics...",
  "Creating a consistent visual identity...",
  "Optimizing visual experience...",
  "Generating final graphic identity...",
];

const BrandIdentityLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const timePerMessage = Math.floor(15000 / loadingMessages.length);
    let messageTimer: NodeJS.Timeout;
    let completionTimer: NodeJS.Timeout;

    const updateMessage = () => {
      setCurrentMessage((prev) => {
        const next = prev + 1;
        if (next >= loadingMessages.length) {
          clearInterval(messageTimer);
          return prev;
        }
        return next;
      });
    };

    messageTimer = setInterval(updateMessage, timePerMessage);
    completionTimer = setTimeout(() => {
      clearInterval(messageTimer);
      onComplete();
    }, 15000);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

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
          Generating Graphic Identity
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
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-12 h-12 bg-orange-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BrandIdentityLoader;
