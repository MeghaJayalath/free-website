/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ValueProp } from "@/components/ValueProp";
import { BuildForm, type FormData, type Aesthetic, validatePhoneNumber, COUNTRIES } from "@/components/BuildForm";
import { SuccessMessage } from "@/components/SuccessMessage";
import { Footer } from "@/components/Footer";
import { BackgroundSlideshow } from "@/components/BackgroundSlideshow";

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    what: "",
    aesthetic: [],
    reference: "",
    phone: "",
    countryCode: "US",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-detect country code from local user locale on mount
  useEffect(() => {
    try {
      // 1. Try timezone FIRST (Most accurate indicator of physical location!)
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone) {
        const tzLower = timeZone.toLowerCase();
        let detectedCode = "";

        if (tzLower.includes("colombo")) {
          detectedCode = "LK";
        } else if (tzLower.includes("kolkata") || tzLower.includes("calcutta")) {
          detectedCode = "IN";
        } else if (tzLower.includes("london")) {
          detectedCode = "GB";
        } else if (
          tzLower.includes("sydney") ||
          tzLower.includes("melbourne") ||
          tzLower.includes("brisbane") ||
          tzLower.includes("adelaide") ||
          tzLower.includes("perth") ||
          tzLower.includes("australia")
        ) {
          detectedCode = "AU";
        } else if (
          tzLower.includes("berlin") ||
          tzLower.includes("munich") ||
          tzLower.includes("frankfurt") ||
          tzLower.includes("germany")
        ) {
          detectedCode = "DE";
        } else if (tzLower.includes("singapore")) {
          detectedCode = "SG";
        }

        if (detectedCode) {
          setFormData((prev) => ({
            ...prev,
            countryCode: detectedCode,
          }));
          return; // Exit successfully!
        }
      }

      // 2. Fallback: Parse region from browser language config (e.g. "en-GB" -> "GB")
      let languageRegion = "";
      if (window.Intl && typeof window.Intl.Locale === "function") {
        const locale = new Intl.Locale(navigator.language);
        languageRegion = locale.region || "";
      } else {
        const parts = navigator.language.split("-");
        if (parts.length > 1) {
          languageRegion = parts[1];
        }
      }

      languageRegion = languageRegion.toUpperCase();

      // If the detected language region is directly in our list, use it
      const isSupported = COUNTRIES.some((c) => c.iso === languageRegion);
      if (isSupported) {
        setFormData((prev) => ({
          ...prev,
          countryCode: languageRegion,
        }));
      }
    } catch (error) {
      console.warn("Could not auto-detect local country code:", error);
    }
  }, []);

  const handleFieldChange = (field: keyof FormData, value: string | Aesthetic[]) => {
    let finalValue = value;
    if (field === "phone" && typeof value === "string") {
      // Auto-strip leading zeros (trunk prefixes) for international dialing compliance
      finalValue = value.replace(/^0+/, "");
    }

    setFormData((prev) => ({
      ...prev,
      [field]: finalValue,
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

  const activeCountry = COUNTRIES.find((c) => c.iso === formData.countryCode) || COUNTRIES[0];
  const cleanPhoneDigits = formData.phone.replace(/\D/g, "").replace(/^0+/, "");
  const fullPhoneNumber = activeCountry
    ? `${activeCountry.code} ${cleanPhoneDigits}`
    : formData.phone;

  const isFormValid =
    formData.what.length > 3 &&
    validatePhoneNumber(formData.phone, formData.countryCode);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "787527be-c23d-458b-ad5e-2a692e569548",
          subject: `New Bespoke Build Request from ${fullPhoneNumber}`,
          from_name: "Bespoke Builds Landing Page",
          what: formData.what,
          aesthetic: formData.aesthetic.join(", ") || "None specified",
          reference: formData.reference || "None provided",
          phone: fullPhoneNumber,
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

  return (
    <div id="app-container" className="min-h-screen w-full flex flex-col items-center justify-start lg:justify-center pt-12 px-6 pb-4 md:pt-12 md:px-12 md:pb-6 lg:p-24 overflow-y-auto lg:overflow-hidden bg-canvas relative lg:h-screen">
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
                  phone={fullPhoneNumber}
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
