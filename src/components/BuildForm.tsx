/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export type Aesthetic = "Minimalist" | "Bold" | "Classic" | "Brutalist";

export interface FormData {
  what: string;
  aesthetic: Aesthetic[];
  reference: string;
  phone: string;
}

export interface BuildFormProps {
  formData: FormData;
  isSubmitting: boolean;
  isFormValid: boolean;
  onFieldChange: (field: keyof FormData, value: string | Aesthetic[]) => void;
  onToggleAesthetic: (tag: Aesthetic) => void;
  onSubmit: (e: FormEvent) => void;
}

export function BuildForm({
  formData,
  isSubmitting,
  isFormValid,
  onFieldChange,
  onToggleAesthetic,
  onSubmit,
}: BuildFormProps) {
  const aesthetics: Aesthetic[] = ["Minimalist", "Bold", "Classic", "Brutalist"];

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-ink/50">
          What are we building?
        </label>
        <textarea
          placeholder="e.g. A clean photographer portfolio with a gallery grid and bio."
          className="input-field min-h-[80px] py-3 resize-none"
          value={formData.what}
          onChange={(e) => onFieldChange("what", e.target.value)}
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
              onClick={() => onToggleAesthetic(tag)}
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
          onChange={(e) => onFieldChange("reference", e.target.value)}
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
          onChange={(e) => onFieldChange("phone", e.target.value)}
          required
        />
      </div>

      <button
        id="submit-button"
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full bg-accent text-white py-4 rounded-md font-medium tracking-wide flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-accent/20 cursor-pointer"
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
  );
}
