import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ColorPaletteSelector } from "@/components/colorPaletteSelector/ColorPaletteSelector";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useProjectsStore } from "@/store/projectsStore";
import { useProjectDetailsStore } from "@/store/projectDetailsStore";
import { useBrandIdentityStore } from "@/store/brandIdentityStore";
import { Project } from "@/types/project";
import BrandIdentityLoader from "../../components/loading/BrandIdentityLoader";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "90%",
    padding: "2rem",
    border: "none",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
};

interface ProjectCreationFormProps {
  onSubmit?: (formData: {
    selectedPalette: {
      id: string;
      name: string;
      color: string;
    };
    typography: string;
    graphicDescription: string;
  }) => void;
  className?: string;
}

export default function CreateProject({
  onSubmit,
  className,
}: ProjectCreationFormProps) {
  const { brandIdentity, setBrandIdentity } = useBrandIdentityStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const addProject = useProjectsStore((state) => state.addProject);
  const setProjectDetails = useProjectDetailsStore(
    (state) => state.setProjectDetails
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleNextStep = (data?: {
    selectedPalette: {
      id: string;
      name: string;
      color: string;
    };
    typography: string;
    graphicDescription: string;
  }) => {
    if (currentStep === 2 && data) {
      setBrandIdentity({
        colorPalette: {
          selectedPalette: data.selectedPalette,
          typography: data.typography,
          graphicDescription: data.graphicDescription,
        },
      });
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const submitForm = () => {
    const project: Project = {
      id: Date.now().toString(),
      title: brandIdentity.brandName,
      description: brandIdentity.mission || "",
      brandName: brandIdentity.brandName,
      slogan: brandIdentity.slogan || "",
      colorPalette: {
        cian: brandIdentity.colorPalette.selectedPalette.color || "#E0F7FA",
        magenta: brandIdentity.colorPalette.selectedPalette.color || "#FCE4EC",
        amarillo: brandIdentity.colorPalette.selectedPalette.color || "#FFFDE7",
        negro: brandIdentity.colorPalette.selectedPalette.color || "#0D0D0D",
      },
      typography: {
        name: "Roboto",
        fontFamily: "'Roboto', sans-serif",
        googleFontLink: "",
        weights: ["400", "500", "700"],
        sampleText: "",
      },
      mockupImage: "https://via.placeholder.com/800x600",
    };

    addProject(project);
    setProjectDetails(project);
    navigate(`/dashboard/projects/${project.id}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep === 3) {
      setIsGenerating(true);
      setTimeout(() => {
        submitForm();
        setIsGenerating(false);
      }, 15000);
    } else {
      handleNextStep();
    }
  };

  const handleGenerateIdentity = () => {
    setIsGenerating(true);
    setIsModalOpen(false);
    setTimeout(() => {
      setIsGenerating(false);
      navigate("/dashboard/preview");
    }, 15000);
  };

  if (currentStep === 1) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-40 mb-28">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-14">
                Step 1: Project Information
              </h2>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    value={brandIdentity.brandName}
                    onChange={(e) =>
                      setBrandIdentity({ brandName: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slogan">Slogan</Label>
                  <Input
                    id="slogan"
                    value={brandIdentity.slogan}
                    onChange={(e) =>
                      setBrandIdentity({ slogan: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="mission">Mission</Label>
                  <Input
                    id="mission"
                    value={brandIdentity.mission}
                    onChange={(e) =>
                      setBrandIdentity({ mission: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="vision">Vision</Label>
                  <Input
                    id="vision"
                    value={brandIdentity.vision}
                    onChange={(e) =>
                      setBrandIdentity({ vision: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="values">Values</Label>
                  <Input
                    id="values"
                    value={brandIdentity.values}
                    onChange={(e) =>
                      setBrandIdentity({ values: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="objective">Objective</Label>
                  <Input
                    id="objective"
                    value={brandIdentity.objective}
                    onChange={(e) =>
                      setBrandIdentity({ objective: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={brandIdentity.targetAudience}
                    onChange={(e) =>
                      setBrandIdentity({ targetAudience: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="sector">Sector</Label>
                  <Select
                    value={brandIdentity.sector}
                    onValueChange={(value) =>
                      setBrandIdentity({ sector: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="submit">Continue</Button>
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
        onPrevious={handlePreviousStep}
        className={className}
      />
    );
  }
  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto lg:ml-[17rem] 2xl:ml-[30rem]"
        >
          <div className="text-center mb-16 mt-20">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Your Visual Identity is Ready
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We've created a unique identity for{" "}
              {brandIdentity.brandName || "your brand"} based on your
              preferences
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Preview Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Preview
                </h3>
                <div className="flex justify-center mb-6">
                  {brandIdentity.colorPalette?.selectedPalette && (
                    <div className="relative">
                      <div
                        className="w-40 h-40 rounded-full shadow-lg border-4 border-white"
                        style={{
                          backgroundColor:
                            brandIdentity.colorPalette.selectedPalette.color,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-2 shadow-md">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100">
                          <span className="text-xs font-bold">
                            {brandIdentity.colorPalette.selectedPalette.color}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h4
                    className="text-xl font-semibold mb-2"
                    style={{
                      fontFamily:
                        brandIdentity.colorPalette?.typography === "roboto"
                          ? "Roboto, sans-serif"
                          : brandIdentity.colorPalette?.typography ===
                            "montserrat"
                          ? "Montserrat, sans-serif"
                          : brandIdentity.colorPalette?.typography === "poppins"
                          ? "Poppins, sans-serif"
                          : brandIdentity.colorPalette?.typography === "inter"
                          ? "Inter, sans-serif"
                          : "inherit",
                    }}
                  >
                    {brandIdentity.brandName || "Brand Name"}
                  </h4>
                  <p className="text-gray-600">
                    {brandIdentity.slogan || "Your slogan here"}
                  </p>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Identity Details
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Color Palette
                    </h4>
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full mr-3 border border-gray-200"
                        style={{
                          backgroundColor:
                            brandIdentity.colorPalette?.selectedPalette
                              ?.color || "#6B7280",
                        }}
                      />
                      <p className="font-medium">
                        {brandIdentity.colorPalette?.selectedPalette?.name ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Typography
                    </h4>
                    <p className="font-medium capitalize">
                      {brandIdentity.colorPalette?.typography ||
                        "Not specified"}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Sector
                    </h4>
                    <p className="font-medium capitalize">
                      {brandIdentity.sector || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="mb-8">
              <p className="text-gray-600 mb-6">
                Would you like to review all details before continuing?
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-6 text-lg font-medium from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all shadow-lg hover:shadow-xl"
              >
                <span className="drop-shadow-sm">View Full Summary</span>
              </Button>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                className="px-6 py-3 border-2 "
              >
                Go Back
              </Button>
              <Button
                onClick={handleGenerateIdentity}
                disabled={isGenerating}
                className="px-6 py-3  bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Identity"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
        {isGenerating && (
          <BrandIdentityLoader onComplete={() => setIsGenerating(false)} />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[9999] overflow-y-auto"
          style={{
            display: isModalOpen ? "block" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden z-[10001]"
            >
              <div className="overflow-y-auto flex-grow">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8 sticky top-0 bg-white z-10 pb-4">
                    <h3 className="text-2xl font-bold">
                      Graphic Identity Summary
                    </h3>
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
                      <h3 className="text-xl font-bold mb-4">
                        Project General Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">
                              Brand Name
                            </p>
                            <p className="text-lg font-semibold">
                              {brandIdentity.brandName || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">
                              Sector
                            </p>
                            <p className="text-lg font-semibold">
                              {brandIdentity.sector || "Not specified"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">
                              Target Audience
                            </p>
                            <p className="text-lg font-semibold">
                              {brandIdentity.targetAudience || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">
                              Vision
                            </p>
                            <p className="text-lg font-semibold capitalize">
                              {brandIdentity.vision || "Not specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-xl font-bold mb-4">
                        Design Specifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="border rounded-lg p-4 flex flex-col items-center bg-[#F6EEEE]"
                        >
                          <h4 className="font-semibold mb-4 text-center">
                            Color Palette
                          </h4>
                          {brandIdentity.colorPalette?.selectedPalette && (
                            <div className="flex flex-col items-center space-y-3">
                              <div
                                className="w-20 h-20 rounded-full shadow-md border-2 border-gray-200"
                                style={{
                                  backgroundColor:
                                    brandIdentity.colorPalette.selectedPalette
                                      .color,
                                }}
                              />
                              <div className="text-center">
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">
                                  {
                                    brandIdentity.colorPalette.selectedPalette
                                      .name
                                  }
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-500">
                                  HEX Code
                                </p>
                                <p className="font-mono font-medium">
                                  {
                                    brandIdentity.colorPalette.selectedPalette
                                      .color
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="border rounded-lg p-4 flex flex-col items-center bg-[#F6EEEE]"
                        >
                          <h4 className="font-semibold mb-4 text-center">
                            Typography
                          </h4>
                          <div className="flex flex-col items-center space-y-3">
                            <div
                              className="text-5xl font-sans"
                              style={{
                                fontFamily:
                                  brandIdentity.colorPalette?.typography ===
                                  "roboto"
                                    ? "Roboto"
                                    : brandIdentity.colorPalette?.typography ===
                                      "montserrat"
                                    ? "Montserrat"
                                    : brandIdentity.colorPalette?.typography ===
                                      "poppins"
                                    ? "Poppins"
                                    : brandIdentity.colorPalette?.typography ===
                                      "inter"
                                    ? "Inter"
                                    : "inherit",
                              }}
                            >
                              Aa
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-500">
                                Font Family
                              </p>
                              <p className="font-medium capitalize">
                                {brandIdentity.colorPalette?.typography ||
                                  "Not selected"}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-4">
                      <Button
                        variant="outline"
                        className="min-w-[120px]"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }
  return null;
}
