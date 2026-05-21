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
      className="relative mt-12 lg:mt-0 lg:absolute lg:bottom-6 lg:left-0 lg:w-full flex flex-col lg:grid lg:grid-cols-3 items-center gap-4 lg:gap-0 text-xs text-ink/40 font-sans tracking-wide px-6 md:px-12 lg:px-24 z-30"
    >
      <span className="order-2 lg:order-1 text-center lg:text-left w-full">&copy; {currentYear} Bespoke Builds. All rights reserved.</span>
      <span className="order-3 lg:order-2 text-center w-full">
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
        className="order-1 lg:order-3 text-center lg:text-right w-full cursor-pointer hover:text-accent transition-colors duration-300 ease-in-out"
      >
        hello@bespokebuilds.app
      </a>
    </motion.footer>
  );
}
