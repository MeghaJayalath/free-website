/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ValueProp } from "@/components/ValueProp";
import { BuildForm, type FormData, type Aesthetic } from "@/components/BuildForm";
import { SuccessMessage } from "@/components/SuccessMessage";
import { Footer } from "@/components/Footer";
import { BackgroundSlideshow } from "@/components/BackgroundSlideshow";

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    what: "",
    aesthetic: [],
    reference: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFieldChange = (field: keyof FormData, value: string | Aesthetic[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleAesthetic = (tag: Aesthetic) => {
    setFormData((prev) => ({
      ...prev,
      aesthetic: prev.aesthetic.includes(tag)
        ? prev.aesthetic.filter((t) => t !== tag)
        : [...prev.aesthetic, tag],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.what) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "",
          subject: "New Bespoke Builds Request",
          from_name: "Bespoke Builds Portal",
          ...formData,
          // Format aesthetics array nicely for the email body
          aesthetic: formData.aesthetic.join(", ") || "None specified",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert(result.message || "Failed to submit request. Please verify your Web3Forms access key.");
      }
    } catch (error) {
      console.error("Web3Forms Submission Error:", error);
      alert("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.what.length > 3 && formData.phone.length >= 8;

  return (
    <div id="app-container" className="min-h-screen w-full flex items-start lg:items-center justify-center pt-12 px-6 pb-24 md:p-12 lg:p-24 overflow-y-auto lg:overflow-hidden bg-canvas relative lg:h-screen">
      {/* Curved Background Slideshow Belt */}
      <BackgroundSlideshow />

      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full max-w-7xl items-center relative z-10"
      >
        {/* Left Side: Copy & Branding */}
        <ValueProp />

        {/* Right Side: Form Artifact */}
        <div id="artifact-container" className="relative h-[580px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="claude-card p-8 md:p-10 w-full max-w-md relative z-10"
              >
                <BuildForm
                  formData={formData}
                  isSubmitting={isSubmitting}
                  isFormValid={isFormValid}
                  onFieldChange={handleFieldChange}
                  onToggleAesthetic={toggleAesthetic}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="claude-card p-12 text-center w-full max-w-md relative z-10 flex flex-col items-center justify-center space-y-6"
              >
                <SuccessMessage
                  phone={formData.phone}
                  onEdit={() => setIsSuccess(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
}
