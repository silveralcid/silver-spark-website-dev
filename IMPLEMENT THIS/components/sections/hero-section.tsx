"use client"

import { useEffect, useRef } from "react"
import { HeroContent } from "./hero/hero-content"
import { SeamlessMarquee } from "../ui/seamless-marquee"
import { TechIcons } from "../ui/tech-icons"
// Remove this import: import "@/app/hero-section.css"

// Define the type for marquee data
interface MarqueeData {
  images: string[]
}

// Array of images for each column
const marqueeData: MarqueeData[] = [
  {
    images: [
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
    ],
  },
  {
    images: [
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
    ],
  },
  {
    images: [
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
      "https://placehold.co/1920x1080.png",
    ],
  },
]

export function HeroSection() {
  const marqueesRef = useRef<(HTMLDivElement | null)[]>([])

  // Scroll animation for marquees
  useEffect(() => {
    marqueesRef.current.forEach((marquee, index) => {
      if (!marquee) return

      let scrollAmount = 0
      const speed = 0.8 + index * 0.2 // Speed increases with each column

      const scroll = () => {
        scrollAmount += speed
        if (scrollAmount >= marquee.scrollHeight / 2) {
          scrollAmount = 0
        }

        const direction = index % 2 === 0 ? -scrollAmount : scrollAmount // Alternate up/down
        marquee.style.transform = `translateY(${direction}px)`
        requestAnimationFrame(scroll)
      }

      scroll()
    })
  }, [])

  return (
    <>
      <style jsx global>{`
        .hero-section {
          width: 100%;
          background-color: #000000;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center bottom;
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .hero-section__content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
          padding-left: 10px;
          padding-right: 10px;
          flex-grow: 1;
          min-height: 44vh;
          max-height: 900px;
          height: 90vh;
        }

        @media (min-width: 376px) {
          .hero-section__content {
            height: 70vh;
          }
        }

        @media (max-width: 766px) {
          .hero-section__content {
            text-align: center;
          }
        }

        @media (min-width: 767px) and (max-width: 1112px) {
          .hero-section__content {
            height: 90vh;
            max-height: none;
          }
        }

        @media (min-width: 1113px) {
          .hero-section__content {
            height: 90vh;
            max-height: none;
          }
        }

        .hero-bg_wrap {
          z-index: 0;
          position: absolute;
          top: 0%;
          bottom: 0%;
          left: 0%;
          right: 0%;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-bg_wrap-col {
          grid-column-gap: 12px;
          grid-row-gap: 12px;
          flex-direction: column;
          flex: none;
          width: 36%;
          display: flex;
          position: relative;
        }

        .hero-bg_wrap-cols {
          grid-column-gap: 12px;
          grid-row-gap: 12px;
          flex-direction: row;
          justify-content: flex-start;
          width: 85%;
          display: flex;
          position: absolute;
          top: -20%;
          bottom: auto;
          left: -10%;
          right: auto;
          transform: rotate(15deg);
        }

        .hero-bg_wrap-col:nth-child(odd) .v-scroll {
          animation-direction: reverse;
        }

        .v-scroll {
          animation: heroscroll 150s linear infinite;
        }

        .hero-bg_wrap-slides {
          grid-column-gap: 12px;
          grid-row-gap: 12px;
          flex-direction: column;
          flex: none;
          display: flex;
        }

        .hero-bg_wrap_slide {
          aspect-ratio: 16 / 9;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .hero-bg_wrap_slide .img-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-bg-gradient_overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.4) 100%);
          z-index: 1;
        }

        .hero-bg-gradient_overlay:after {
          content: none;
        }

        .hero-section .container {
          position: relative;
          z-index: 2;
          max-width: 1320px;
          margin-inline: auto;
          width: 100%;
          padding-inline: 20px;
          transition: max-width 0.3s;
        }

        @keyframes heroscroll {
          0% {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }

          100% {
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
          }
        }

        // Adjust the hero background for small screens
        @media (max-width: 480px) {
          .hero-bg_wrap-cols {
            width: 100%;  /* Increase width to fill more space */
            left: -5%;    /* Adjust position to be more centered */
          }
          
          .hero-bg_wrap-col {
            width: 40%;   /* Slightly wider columns on mobile */
          }
          
          .hero-bg_wrap_slide {
            margin-bottom: 8px;  /* Reduce spacing between slides */
          }
        }

        // Extra small screens need even more adjustment
        @media (max-width: 360px) {
          .hero-bg_wrap-cols {
            width: 120%;  /* Overflow slightly to ensure full coverage */
            left: -10%;   /* Position to ensure center coverage */
          }
          
          .hero-bg_wrap-col {
            width: 45%;   /* Even wider columns for tiny screens */
          }
          
          /* Ensure the gradient overlay covers everything */
          .hero-bg-gradient_overlay {
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.5) 100%);
          }
        }

        // Ensure content is properly positioned on small screens
        @media (max-width: 480px) {
          .hero-section__content {
            min-height: 60vh;  /* Ensure minimum height on small screens */
          }
          
          .hero-section .container {
            padding-inline: 15px;  /* Slightly reduce padding to maximize content space */
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-section__content">
          {/* Background Wrapper */}
          <div className="hero-bg_wrap">
            <div className="hero-bg_wrap-cols">
              {marqueeData.map((data, index) => (
                <div key={index} className="hero-bg_wrap-col">
                  {/* First Row of Images */}
                  <div
                    className="hero-bg_wrap-slides v-scroll"
                    ref={(el) => {
                      marqueesRef.current[index * 2] = el
                    }}
                  >
                    {data.images.concat(data.images).map((src, i) => (
                      <div key={`${index}-top-${i}`} className="hero-bg_wrap_slide">
                        <img
                          src={src || "/placeholder.svg"}
                          alt={`slide-${i}`}
                          loading={i > 1 ? "lazy" : "eager"}
                          decoding="async"
                          className="img-cover"
                          width={500}
                          height={281}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Second Row of Images */}
                  <div
                    className="hero-bg_wrap-slides v-scroll"
                    ref={(el) => {
                      marqueesRef.current[index * 2 + 1] = el
                    }}
                  >
                    {data.images.concat(data.images).map((src, i) => (
                      <div key={`${index}-bottom-${i}`} className="hero-bg_wrap_slide">
                        <img
                          src={src || "/placeholder.svg"}
                          alt={`slide-${i}`}
                          loading={i > 1 ? "lazy" : "eager"}
                          decoding="async"
                          className="img-cover"
                          width={500}
                          height={281}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient Overlay */}
            <div className="hero-bg-gradient_overlay"></div>
          </div>

          {/* Main Content */}
          <div className="container">
            <HeroContent />
          </div>
        </div>

        {/* Seamless Marquee */}
        <div
          className="relative w-full border-t border-white/10 overflow-hidden flex items-center mt-auto py-6"
          style={{
            zIndex: 5,
            background: "#000000" /* Solid black background */,
          }}
        >
          {/* Fade overlay at the bottom (above the marquee) */}
          <div
            className="absolute -top-[150px] left-0 right-0 h-[150px] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
              zIndex: 2,
            }}
          />

          <SeamlessMarquee speed={40} pauseOnHover={false} gap={60} className="w-full">
            {TechIcons.map((icon, index) => (
              <div key={index} className="w-16 h-16 text-white fill-white">
                {icon}
              </div>
            ))}
          </SeamlessMarquee>
        </div>
      </section>
    </>
  )
}

