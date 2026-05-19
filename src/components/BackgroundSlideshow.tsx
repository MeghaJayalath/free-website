/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const IMAGES = [
  "https://i.postimg.cc/QMh35D7c/Lexigram-2.png",
  "https://i.postimg.cc/L8THxh27/BYM-3.png",
  "https://i.postimg.cc/5tyMp3Pq/Study-Reserve-2.png",
  "https://i.postimg.cc/9Qx649Wj/Asset-Shield-2.png",
  "https://i.postimg.cc/cL5z1Nm3/Falcon-Search-2.png",
  "https://i.postimg.cc/Dyxj5KRN/Coachello-1.png"
];

// Triple the list of images to ensure seamless infinite looping on wider displays
const SLIDE_IMAGES = [...IMAGES, ...IMAGES, ...IMAGES];

export function BackgroundSlideshow() {
  return (
    <>
      {/* 
        Inline SVG Definition for the Wave ClipPath.
        Using clipPathUnits="objectBoundingBox" allows the curve coordinates (0 to 1)
        to dynamically scale perfectly with the container's responsive width and height.
      */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.55 C 0.12,0.4 0.18,0.32 0.25,0.32 C 0.36,0.32 0.46,0.53 0.6,0.53 C 0.75,0.53 0.88,0.1 1,0.02 L 1,0.42 C 0.88,0.42 0.75,0.65 0.6,0.65 C 0.46,0.65 0.36,0.52 0.25,0.52 C 0.18,0.52 0.12,0.95 0,0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Slideshow Container */}
      <div
        className="absolute left-0 right-0 w-full overflow-hidden pointer-events-none z-0 top-[42%] md:top-[50%] -translate-y-1/2 select-none h-[260px] md:h-[420px]"
        style={{
          clipPath: 'url(#wave-clip)',
          WebkitClipPath: 'url(#wave-clip)',
        }}
      >
        {/* Warm color watermark container that lights up slightly on hover */}
        <div className="flex gap-6 w-max items-center animate-marquee opacity-[0.2] transition-opacity duration-700 hover:opacity-[0.28] h-full">
          {SLIDE_IMAGES.map((url, idx) => (
            <div
              key={idx}
              className="w-48 h-full md:w-72 shrink-0 bg-ink/5 overflow-hidden"
            >
              <img
                src={url}
                alt="Bespoke Showcase"
                className="w-full h-full object-cover saturate-[0.85] contrast-[1.02]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
