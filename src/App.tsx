/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type Aesthetic = "Minimalist" | "Bold" | "Classic" | "Brutalist";

export default function App() {
  const [formData, setFormData] = useState({
    what: "",
    aesthetic: [] as Aesthetic[],
    reference: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleAesthetic = (tag: Aesthetic) => {
    setFormData((prev) => ({
      ...prev,
      aesthetic: prev.aesthetic.includes(tag)
        ? prev.aesthetic.filter((t) => t !== tag)
        : [...prev.aesthetic, tag],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.what) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const isFormValid = formData.what.length > 3 && formData.phone.length >= 8;

  const aesthetics: Aesthetic[] = ["Minimalist", "Bold", "Classic", "Brutalist"];

  return (
    <div id="app-container" className="h-screen w-full flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden bg-canvas">
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full max-w-7xl items-center"
      >
        {/* Left Side: Copy */}
        <div id="value-prop" className="flex flex-col h-full justify-between py-8">
          <div>
            <div id="logo" className="mb-12">
              <span className="font-serif text-2xl font-semibold tracking-tight text-ink">Bespoke Builds</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 text-ink">
              A world-class website. <br />
              <span className="italic font-normal">Built for you, for free.</span>
            </h1>

            <p className="text-lg md:text-xl text-ink/70 max-w-lg mb-12 leading-relaxed">
              We believe every great idea deserves a premium digital home. 
              No builders, no templates, no cost. Just professional design 
              commissioned specifically for your vision.
            </p>
          </div>

          <div className="mt-auto">
            <p className="text-xs uppercase tracking-widest text-ink/30 font-medium border-t border-border-subtle pt-6">
              Limited to 5 bespoke projects per week to maintain quality
            </p>
          </div>
        </div>

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
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                      What are we building?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Portfolio for a photographer"
                      className="input-field"
                      value={formData.what}
                      onChange={(e) => setFormData({ ...formData, what: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink/50 block">
                      Describe your aesthetic
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {aesthetics.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleAesthetic(tag)}
                          className={`tag-btn ${formData.aesthetic.includes(tag) ? 'active' : ''}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                      Reference URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="Link a site you love"
                      className="input-field"
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                      Where can we text you the preview link?
                    </label>
                    <input
                      type="tel"
                      placeholder="Your phone number"
                      className="input-field"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <button
                    id="submit-button"
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-accent text-white py-4 rounded-md font-medium tracking-wide flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-accent/20"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Start My Build
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="claude-card p-12 text-center w-full max-w-md relative z-10 flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-semibold">Requirement received.</h3>
                  <p className="text-ink/60 leading-relaxed font-sans">
                    Our lead designer will reach out to <span className="text-ink font-medium">{formData.phone}</span> within 24 hours.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-sm font-medium text-ink/40 hover:text-ink transition-colors"
                >
                  Edit requirements
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative background element for the artifact side */}
          <div id="decorative-texture" className="absolute inset-0 -z-10 bg-[radial-gradient(#E8E6DC_1px,transparent_1px)] [background-size:20px_20px] opacity-40 mask-image-[radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"></div>
        </div>
      </motion.main>
    </div>
  );
}
