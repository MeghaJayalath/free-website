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
  countryCode: string;
}

export interface BuildFormProps {
  formData: FormData;
  isSubmitting: boolean;
  isFormValid: boolean;
  onFieldChange: (field: keyof FormData, value: string | Aesthetic[]) => void;
  onToggleAesthetic: (tag: Aesthetic) => void;
  onSubmit: (e: FormEvent) => void;
}

export interface Country {
  code: string;
  iso: string;
  name: string;
  flag: string;
  regex: RegExp;
  placeholder: string;
}

export const COUNTRIES: Country[] = [
  { iso: "US", code: "+1", name: "United States", flag: "🇺🇸", regex: /^\d{10}$/, placeholder: "201 555 0123" },
  { iso: "GB", code: "+44", name: "United Kingdom", flag: "🇬🇧", regex: /^\d{10}$/, placeholder: "7911 123456" },
  { iso: "AU", code: "+61", name: "Australia", flag: "🇦🇺", regex: /^\d{9}$/, placeholder: "412 345 678" },
  { iso: "IN", code: "+91", name: "India", flag: "🇮🇳", regex: /^[6-9]\d{9}$/, placeholder: "98765 43210" },
  { iso: "DE", code: "+49", name: "Germany", flag: "🇩🇪", regex: /^\d{10,11}$/, placeholder: "151 23456789" },
  { iso: "LK", code: "+94", name: "Sri Lanka", flag: "🇱🇰", regex: /^[7]\d{8}$/, placeholder: "77 123 4567" },
  { iso: "SG", code: "+65", name: "Singapore", flag: "🇸🇬", regex: /^[89]\d{7}$/, placeholder: "8123 4567" }
];

export function validatePhoneNumber(phone: string, countryIso: string): boolean {
  const country = COUNTRIES.find((c) => c.iso === countryIso);
  if (!country) return false;
  // Strip all non-digits
  const cleanPhone = phone.replace(/\D/g, "");
  return country.regex.test(cleanPhone);
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
  
  const activeCountry = COUNTRIES.find((c) => c.iso === formData.countryCode) || COUNTRIES[0];
  const isValid = formData.phone === "" || validatePhoneNumber(formData.phone, formData.countryCode);

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
        <label className="text-xs font-semibold uppercase tracking-wider text-ink/50 block">
          Where can we text you the preview link?
        </label>
        <div className="flex items-center bg-white border border-border-subtle rounded-md focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all overflow-hidden h-[46px]">
          <div className="relative h-full flex items-center bg-canvas/10 border-r border-border-subtle hover:bg-canvas/20 transition-colors">
            <select
              value={formData.countryCode}
              onChange={(e) => onFieldChange("countryCode", e.target.value)}
              className="bg-transparent pl-3 pr-6 h-full text-xs sm:text-sm font-semibold text-ink/75 focus:outline-none cursor-pointer appearance-none select-none w-[84px] uppercase tracking-wide"
            >
              {COUNTRIES.map((c) => (
                <option key={c.iso} value={c.iso} className="bg-white text-ink text-left normal-case">
                  {c.iso} {c.code}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex items-center text-ink/30">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <input
            type="tel"
            placeholder={activeCountry.placeholder}
            className="flex-1 px-4 py-3 bg-transparent text-[13px] placeholder:text-ink/30 focus:outline-none w-full h-full text-ink font-sans"
            value={formData.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            required
          />
        </div>
        {!isValid && formData.phone !== "" && (
          <p className="text-[11px] text-accent/80 font-medium leading-none mt-1 animate-pulse">
            * Please enter a valid number for {activeCountry.name} (e.g. {activeCountry.placeholder})
          </p>
        )}
      </div>

      <button
        id="submit-button"
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full bg-accent text-white py-4 rounded-md font-medium tracking-wide flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-accent/20 cursor-pointer text-sm"
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
