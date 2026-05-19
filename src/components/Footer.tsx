/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="relative mt-12 md:mt-0 md:absolute md:bottom-6 md:left-0 md:w-full flex flex-col md:grid md:grid-cols-3 items-center gap-4 md:gap-0 text-xs text-ink/40 font-sans tracking-wide px-6 md:px-12 lg:px-24 z-30"
    >
      <span className="order-2 md:order-1 text-center md:text-left w-full">&copy; {currentYear} Bespoke Builds. All rights reserved.</span>
      <span className="order-3 md:order-2 text-center w-full">
        Powered by{" "}
        <a
          href="http://zeroonetech.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium cursor-pointer hover:text-accent transition-colors duration-300 ease-in-out"
        >
          Zero One Technologies
        </a>
      </span>
      <a
        href="mailto:megha@zotech.xyz"
        className="order-1 md:order-3 text-center md:text-right w-full cursor-pointer hover:text-accent transition-colors duration-300 ease-in-out"
      >
        hello@bespokebuilds.com
      </a>
    </motion.footer>
  );
}
