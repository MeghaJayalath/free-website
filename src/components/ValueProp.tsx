/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function ValueProp() {
  return (
    <div id="value-prop" className="flex flex-col h-full justify-between py-8">
      <div>
        <div id="logo" className="mb-12">
          <span className="font-serif text-2xl font-semibold tracking-tight text-ink">Bespoke Builds</span>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 text-ink">
          A world-class website. <br />
          <span className="italic font-normal">Built for you, for <span className="text-accent font-semibold">free</span>.</span>
        </h1>

        <p className="text-lg md:text-xl text-ink/70 max-w-lg mb-12 leading-relaxed">
          We believe every great idea deserves a premium digital home. 
          No builders, no templates, no cost. Just professional design 
          commissioned specifically for your vision.
        </p>
      </div>

    </div>
  );
}
