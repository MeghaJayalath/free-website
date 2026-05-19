/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check } from "lucide-react";

export interface SuccessMessageProps {
  phone: string;
  onEdit: () => void;
}

export function SuccessMessage({ phone, onEdit }: SuccessMessageProps) {
  return (
    <>
      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
        <Check className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl font-semibold">Requirement received.</h3>
        <p className="text-ink/60 leading-relaxed font-sans">
          Our lead designer will reach out to <span className="text-ink font-medium">{phone}</span> within 24 hours.
        </p>
      </div>
      <button 
        onClick={onEdit}
        className="text-sm font-medium text-ink/40 hover:text-ink transition-colors cursor-pointer"
      >
        Edit requirements
      </button>
    </>
  );
}
