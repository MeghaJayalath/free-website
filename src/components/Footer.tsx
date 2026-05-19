/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="absolute bottom-6 left-0 w-full flex flex-col-reverse md:flex-row justify-between items-center gap-2 md:gap-0 text-xs text-ink/40 font-sans tracking-wide px-6 md:px-12 lg:px-24">
      <span>&copy; {currentYear} Bespoke Builds. All rights reserved.</span>
      <a
        href="mailto:megha@zotech.xyz"
        className="hover:text-ink transition-colors underline decoration-transparent hover:decoration-ink/30 underline-offset-4"
      >
        hello@bespokebuilds.com
      </a>
    </footer>
  );
}
