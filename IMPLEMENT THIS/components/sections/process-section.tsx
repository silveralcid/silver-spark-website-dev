"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { CheckCircle } from "lucide-react"

export function ProcessSection() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [firePosition, setFirePosition] = useState({ top: 0, left: "50%" })
  const [isVisible, setIsVisible] = useState(false)
  const lastCheckpointRef = useRef<HTMLDivElement>(null)
  const [activatedSteps, setActivatedSteps] = useState<boolean[]>([])
  const [filledSteps, setFilledSteps] = useState<boolean[]>([])
  const circleSparkRefs = useRef<(HTMLDivElement | null)[]>([])
  const circleSmokeRefs = useRef<(HTMLDivElement | null)[]>([])

  const [sparkCount, setSparkCount] = useState(0)
  const maxSparks = 20
  const sparkContainerRef = useRef<HTMLDivElement>(null)
  const sparkIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])
  const fillTimersRef = useRef<(NodeJS.Timeout | null)[]>([])

  // Initialize circle refs array
  useEffect(() => {
    circleRefs.current = Array(processSteps.length).fill(null)
    circleSparkRefs.current = Array(processSteps.length).fill(null)
    circleSmokeRefs.current = Array(processSteps.length).fill(null)
    fillTimersRef.current = Array(processSteps.length).fill(null)
    setActivatedSteps(Array(processSteps.length).fill(false))
    setFilledSteps(Array(processSteps.length).fill(false))
  }, [])

  // CSS keyframes for the fuse animations - moved inside component
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes pulse-fuse {
        0%, 100% {
          opacity: 0.7;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 0.9;
          transform: translate(-50%, -50%) scale(1.2);
        }
      }
      
      @keyframes flicker-fuse {
        0%, 100% {
          opacity: 0.9;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.1);
        }
      }
      
      @keyframes fill-circle {
        0% {
          background: #fff;
          box-shadow: none;
        }
        100% {
          background: linear-gradient(135deg, #f97316, #f59e0b, #fbbf24);
          box-shadow: 0 0 12px rgba(255, 165, 0, 0.6);
        }
      }
      
      @keyframes circle-pulse-1 {
        0%, 100% {
          box-shadow: 0 0 12px rgba(255, 165, 0, 0.6);
        }
        50% {
          box-shadow: 0 0 20px rgba(255, 165, 0, 0.8);
        }
      }
      
      @keyframes circle-pulse-2 {
        0%, 100% {
          box-shadow: 0 0 15px rgba(255, 165, 0, 0.7);
        }
        60% {
          box-shadow: 0 0 18px rgba(255, 87, 34, 0.8);
        }
      }
      
      @keyframes circle-pulse-3 {
        0%, 100% {
          box-shadow: 0 0 10px rgba(255, 165, 0, 0.5);
        }
        40%, 80% {
          box-shadow: 0 0 22px rgba(255, 165, 0, 0.7);
        }
      }
      
      @keyframes big-explosion {
        0% {
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(4);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && timelineRef.current && lastCheckpointRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect()
        const sectionTop = sectionRect.top
        const sectionHeight = sectionRect.height
        const timelineHeight = timelineRef.current.offsetHeight
        const viewportHeight = window.innerHeight
        const lastCheckpointPosition = lastCheckpointRef.current.getBoundingClientRect()

        // Calculate the center point of the viewport
        const viewportCenter = viewportHeight / 2

        // Calculate how far the section's center is from the viewport center
        const sectionCenter = sectionTop + sectionHeight / 2
        const distanceFromCenter = viewportCenter - sectionCenter

        // Calculate the total distance the section will travel (from entering to exiting viewport)
        const totalDistance = sectionHeight + viewportHeight

        // Calculate progress based on the section's position relative to viewport center
        // This creates a centered effect where the burning point is at the viewport center
        const scrollProgress = (distanceFromCenter + totalDistance / 2) / totalDistance

        // Clamp the progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

        // Calculate the position along the timeline
        const timelinePosition = clampedProgress * timelineHeight

        // Set the fire position
        setFirePosition({
          top: timelinePosition,
          left: "50%",
        })

        // Make the fire visible when the section is in view
        setIsVisible(sectionTop < viewportHeight && sectionTop > -sectionHeight)

        // Check which circles have been passed by the burning fuse
        // Add an offset to make circles fill up sooner (before the flame actually reaches them)
        const activationOffset = 40 // pixels before the flame reaches the circle

        const newActivatedSteps = [...activatedSteps]
        circleRefs.current.forEach((circleRef, index) => {
          if (circleRef) {
            const circlePosition = circleRef.getBoundingClientRect().top - sectionRect.top
            // Activate the circle when the flame is approaching (within the offset)
            if (timelinePosition + activationOffset >= circlePosition && !newActivatedSteps[index]) {
              newActivatedSteps[index] = true

              // Start the fill sequence
              startFillSequence(index)
            }
          }
        })

        if (JSON.stringify(newActivatedSteps) !== JSON.stringify(activatedSteps)) {
          setActivatedSteps(newActivatedSteps)
        }
      }

      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [activatedSteps])

  // Function to handle the fill sequence
  const startFillSequence = (index: number) => {
    // Clear any existing timer
    if (fillTimersRef.current[index]) {
      clearTimeout(fillTimersRef.current[index]!)
    }

    // Set a timer to trigger the big explosion after the fill animation completes
    fillTimersRef.current[index] = setTimeout(() => {
      // Create the big explosion effect
      createBigExplosion(index)

      // Mark the step as filled
      const newFilledSteps = [...filledSteps]
      newFilledSteps[index] = true
      setFilledSteps(newFilledSteps)

      // Start ongoing smoke and spark effects
      startOngoingEffects(index)

      // Clear the timer reference
      fillTimersRef.current[index] = null
    }, 500) // This should match the fill animation duration
  }

  // Function to create the big explosion effect
  const createBigExplosion = (index: number) => {
    if (!circleRefs.current[index]) return

    // Create explosion element
    const explosion = document.createElement("div")
    explosion.className = "absolute left-1/2 top-1/2 w-full h-full rounded-full"
    explosion.style.background =
      "radial-gradient(circle, rgba(255,165,0,0.8) 0%, rgba(255,87,34,0.4) 50%, rgba(255,87,34,0) 70%)"
    explosion.style.animation = "big-explosion 0.6s ease-out forwards"
    explosion.style.zIndex = "20"

    // Add to circle
    circleRefs.current[index]!.appendChild(explosion)

    // Create many sparks for the explosion
    const sparkCount = 15 + Math.floor(Math.random() * 10)

    if (circleSparkRefs.current[index]) {
      for (let i = 0; i < sparkCount; i++) {
        setTimeout(() => {
          createExplosionSpark(circleSparkRefs.current[index]!)
        }, Math.random() * 100)
      }
    }

    // Create smoke effect
    if (circleSmokeRefs.current[index]) {
      createSmokeEffect(circleSmokeRefs.current[index]!, true)
    }

    // Remove explosion element after animation completes
    setTimeout(() => {
      explosion.remove()
    }, 600)
  }

  // Function to create a spark for the explosion
  const createExplosionSpark = (container: HTMLDivElement) => {
    // Create spark element
    const spark = document.createElement("div")
    spark.className = "absolute w-2 h-2 rounded-full"

    // Randomize color
    const colors = ["#f97316", "#f59e0b", "#fbbf24", "#ffedd5"]
    const color = colors[Math.floor(Math.random() * colors.length)]
    spark.style.backgroundColor = color

    // Add to container
    container.appendChild(spark)

    // Random angle and speed
    const angle = Math.random() * Math.PI * 2
    const speed = 2 + Math.random() * 4 // Faster than regular sparks
    const distance = 20 + Math.random() * 40 // Longer distance
    const velocityX = Math.cos(angle) * speed
    const velocityY = Math.sin(angle) * speed
    const lifespan = 400 + Math.random() * 300

    // Initial position (center of circle)
    let posX = 0
    let posY = 0

    // Start time
    const startTime = performance.now()

    // Animation function
    const animateSpark = (time: number) => {
      const elapsed = time - startTime

      if (elapsed > lifespan) {
        spark.remove()
        return
      }

      // Update position with easing
      const progress = elapsed / lifespan
      const easeOut = 1 - Math.pow(1 - progress, 2) // Quadratic ease out

      posX = velocityX * distance * easeOut
      posY = velocityY * distance * easeOut

      // Scale down as it fades
      const scale = 1 - easeOut

      // Apply styles
      spark.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`
      spark.style.opacity = (1 - easeOut).toString()
      spark.style.boxShadow = `0 0 ${4 + scale * 6}px ${color}`

      requestAnimationFrame(animateSpark)
    }

    requestAnimationFrame(animateSpark)
  }

  // Function to create smoke effect
  const createSmokeEffect = (container: HTMLDivElement, isExplosion = false) => {
    const particleCount = isExplosion ? 8 + Math.floor(Math.random() * 6) : 2 + Math.floor(Math.random() * 3)

    for (let i = 0; i < particleCount; i++) {
      setTimeout(
        () => {
          // Create smoke particle
          const smoke = document.createElement("div")
          smoke.className = "absolute rounded-full"

          // Size based on whether it's an explosion or ongoing
          const size = isExplosion ? 6 + Math.random() * 8 : 3 + Math.random() * 4
          smoke.style.width = `${size}px`
          smoke.style.height = `${size}px`

          // Smoke color and opacity
          const opacity = 0.3 + Math.random() * 0.4
          smoke.style.backgroundColor = `rgba(100, 100, 100, ${opacity})`
          smoke.style.filter = "blur(2px)"

          // Add to container
          container.appendChild(smoke)

          // Random angle and speed (smoke rises, so more upward bias)
          const angle = Math.random() * Math.PI + Math.PI / 2 // Mostly upward
          const speed = 0.3 + Math.random() * 0.8
          const distance = isExplosion ? 30 + Math.random() * 30 : 15 + Math.random() * 15
          const velocityX = Math.cos(angle) * speed
          const velocityY = Math.sin(angle) * speed
          const lifespan = isExplosion ? 1000 + Math.random() * 500 : 800 + Math.random() * 400

          // Initial position (center of circle)
          let posX = 0
          let posY = 0

          // Start time
          const startTime = performance.now()

          // Animation function
          const animateSmoke = (time: number) => {
            const elapsed = time - startTime

            if (elapsed > lifespan) {
              smoke.remove()
              return
            }

            // Update position with easing
            const progress = elapsed / lifespan
            const easeOut = 1 - Math.pow(1 - progress, 2) // Quadratic ease out

            posX = velocityX * distance * easeOut
            posY = velocityY * distance * easeOut

            // Grow slightly then fade
            const scale = isExplosion
              ? 1 + easeOut * 2
              : // Explosion smoke grows more
                1 + easeOut

            // Apply styles
            smoke.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`
            smoke.style.opacity = (1 - easeOut).toString()

            requestAnimationFrame(animateSmoke)
          }

          requestAnimationFrame(animateSmoke)
        },
        isExplosion ? Math.random() * 200 : Math.random() * 500,
      )
    }
  }

  // Function to start ongoing effects after explosion
  const startOngoingEffects = (index: number) => {
    // Start interval for occasional small sparks
    const sparkInterval = setInterval(
      () => {
        if (circleSparkRefs.current[index] && Math.random() > 0.5) {
          createCircleSparks(circleSparkRefs.current[index]!, 1 + Math.floor(Math.random() * 2))
        }
      },
      1000 + Math.random() * 2000,
    )

    // Start interval for occasional smoke
    const smokeInterval = setInterval(
      () => {
        if (circleSmokeRefs.current[index] && Math.random() > 0.7) {
          createSmokeEffect(circleSmokeRefs.current[index]!)
        }
      },
      2000 + Math.random() * 3000,
    )

    // Clean up intervals when component unmounts
    return () => {
      clearInterval(sparkInterval)
      clearInterval(smokeInterval)
    }
  }

  // Function to create sparks for activated circles
  const createCircleSparks = (container: HTMLDivElement, count = 5) => {
    // Number of sparks to create
    const sparkCount = count || 3 + Math.floor(Math.random() * 3)

    for (let i = 0; i < sparkCount; i++) {
      setTimeout(() => {
        // Create spark element
        const spark = document.createElement("div")
        spark.className = "absolute w-1 h-1 rounded-full"

        // Randomize color
        const colors = ["#f97316", "#f59e0b", "#fbbf24", "#ffedd5"]
        const color = colors[Math.floor(Math.random() * colors.length)]
        spark.style.backgroundColor = color

        // Add to container
        container.appendChild(spark)

        // Random angle and speed
        const angle = Math.random() * Math.PI * 2
        const speed = 0.5 + Math.random() * 1.5
        const distance = 10 + Math.random() * 20
        const velocityX = Math.cos(angle) * speed
        const velocityY = Math.sin(angle) * speed
        const lifespan = 500 + Math.random() * 500

        // Initial position (center of circle)
        let posX = 0
        let posY = 0

        // Start time
        const startTime = performance.now()

        // Animation function
        const animateSpark = (time: number) => {
          const elapsed = time - startTime

          if (elapsed > lifespan) {
            spark.remove()
            return
          }

          // Update position with easing
          const progress = elapsed / lifespan
          const easeOut = 1 - Math.pow(1 - progress, 3) // Cubic ease out

          posX = velocityX * distance * easeOut
          posY = velocityY * distance * easeOut

          // Scale down as it fades
          const scale = 1 - easeOut

          // Apply styles
          spark.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`
          spark.style.opacity = (1 - easeOut).toString()
          spark.style.boxShadow = `0 0 ${2 + scale * 3}px ${color}`

          requestAnimationFrame(animateSpark)
        }

        requestAnimationFrame(animateSpark)
      }, Math.random() * 300) // Stagger spark creation
    }
  }

  // Effect for creating and animating sparks
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    // Function to create a spark
    const createSpark = () => {
      if (!sparkContainerRef.current || sparkCount >= maxSparks) return

      // Create spark element
      const spark = document.createElement("div")
      spark.className = "absolute w-1 h-1 rounded-full bg-yellow-400"
      sparkContainerRef.current.appendChild(spark)

      // Random angle and speed
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 2
      const velocityX = Math.cos(angle) * speed
      const velocityY = Math.sin(angle) * speed
      const lifespan = 300 + Math.random() * 200

      // Initial position
      let posX = 0
      let posY = 0

      // Start time
      const startTime = performance.now()

      // Increment spark count
      setSparkCount((prev) => prev + 1)

      // Animation function
      const animateSpark = (time: number) => {
        const elapsed = time - startTime

        if (elapsed > lifespan) {
          spark.remove()
          setSparkCount((prev) => prev - 1)
          return
        }

        // Update position
        posX += velocityX
        posY += velocityY

        // Scale down as it fades
        const scale = 1 - elapsed / lifespan

        // Apply styles
        spark.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`
        spark.style.opacity = scale.toString()
        spark.style.boxShadow = `0 0 ${2 + scale * 3}px rgba(255, 165, 0, ${scale * 0.8})`

        requestAnimationFrame(animateSpark)
      }

      requestAnimationFrame(animateSpark)
    }

    if (isVisible) {
      // Set interval to create sparks
      intervalId = setInterval(createSpark, 100)
      sparkIntervalRef.current = intervalId
    } else {
      if (sparkIntervalRef.current) {
        clearInterval(sparkIntervalRef.current)
        sparkIntervalRef.current = null
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isVisible, sparkCount])

  // Generate a random pulse animation for each circle
  const getRandomPulseAnimation = (index: number) => {
    const animations = ["circle-pulse-1", "circle-pulse-2", "circle-pulse-3"]
    const randomIndex = (index + Math.floor(Math.random() * 2)) % animations.length
    const randomDuration = 1.5 + Math.random() * 1.5
    const randomDelay = Math.random() * 0.5

    return `${animations[randomIndex]} ${randomDuration}s infinite alternate ease-in-out ${randomDelay}s`
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-black text-white relative">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Our Process"
          subtitle="A proven methodology that delivers results every time"
          alignment="center"
          className="mb-16"
        />

        <div className="relative">
          {/* Timeline line with burning effect */}
          <div
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-1/2 h-full hidden md:block"
            style={{ width: "2px" }}
          >
            {/* Unburnt fuse */}
            <div
              className="absolute top-0 left-0 w-full bg-gray-700"
              style={{
                height: "100%",
                zIndex: 5,
              }}
            ></div>

            {/* Burnt fuse - grows with scroll */}
            <div
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${firePosition.top}px`,
                background: "linear-gradient(to bottom, #f97316, #f59e0b, #fbbf24)",
                boxShadow: "0 0 8px rgba(255, 165, 0, 0.6)",
                zIndex: 6,
              }}
            ></div>
          </div>

          {/* Burning fuse effect that follows the timeline */}
          {isVisible && (
            <div
              className="absolute transform -translate-x-1/2 z-20 hidden md:block"
              style={{
                top: `${firePosition.top}px`,
                left: firePosition.left,
              }}
            >
              {/* Fuse glow effect */}
              <div
                className="absolute w-6 h-6 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,165,0,0.8) 0%, rgba(255,87,34,0.4) 50%, rgba(255,87,34,0) 70%)",
                  transform: "translate(-50%, -50%)",
                  filter: "blur(3px)",
                  animation: "pulse-fuse 1s infinite alternate ease-in-out",
                }}
              ></div>

              {/* Ember core */}
              <div
                className="absolute w-3 h-3 rounded-full bg-orange-500"
                style={{
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 10px 2px rgba(255, 87, 34, 0.8)",
                  animation: "flicker-fuse 0.5s infinite alternate ease-in-out",
                }}
              ></div>

              {/* Spark container */}
              <div
                id="fuse-spark-container"
                className="absolute w-1 h-1"
                style={{ transform: "translate(-50%, -50%)" }}
                ref={sparkContainerRef}
              ></div>
            </div>
          )}

          <div className="space-y-24">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline dot - with ref for tracking */}
                <div
                  ref={(el) => {
                    circleRefs.current[index] = el
                    if (index === processSteps.length - 1) {
                      lastCheckpointRef.current = el
                    }
                  }}
                  className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full z-10 hidden md:block transition-all duration-500 overflow-visible`}
                  style={
                    activatedSteps[index]
                      ? {
                          background: filledSteps[index]
                            ? "linear-gradient(135deg, #f97316, #f59e0b, #fbbf24)"
                            : "linear-gradient(135deg, #f97316, #f59e0b, #fbbf24)",
                          boxShadow: "0 0 12px rgba(255, 165, 0, 0.6)",
                          animation: filledSteps[index]
                            ? getRandomPulseAnimation(index)
                            : "fill-circle 0.5s ease-out forwards",
                        }
                      : { background: "#fff" }
                  }
                >
                  {/* Container for circle sparks */}
                  <div
                    ref={(el) => (circleSparkRefs.current[index] = el)}
                    className="absolute inset-0 w-full h-full"
                  ></div>

                  {/* Container for smoke effects */}
                  <div
                    ref={(el) => (circleSmokeRefs.current[index] = el)}
                    className="absolute inset-0 w-full h-full"
                  ></div>
                </div>

                <div className={`md:flex items-center ${index % 2 === 0 ? "" : "flex-row-reverse"}`}>
                  {/* Step number - visible on mobile, hidden on desktop */}
                  <div className="flex items-center mb-4 md:hidden">
                    <div
                      className="w-8 h-8 rounded-full mr-3 transition-all duration-300 overflow-visible"
                      style={
                        activatedSteps[index]
                          ? {
                              background: "linear-gradient(135deg, #f97316, #f59e0b, #fbbf24)",
                              boxShadow: "0 0 12px rgba(255, 165, 0, 0.6)",
                              animation: filledSteps[index]
                                ? getRandomPulseAnimation(index)
                                : "fill-circle 0.5s ease-out forwards",
                            }
                          : { background: "#fff" }
                      }
                    ></div>
                    <span className="text-xl font-bold text-white">Phase {step.phase}</span>
                  </div>

                  <div className="md:w-1/2 md:px-12 mb-8 md:mb-0">
                    <span className="text-xl font-bold text-white hidden md:block">Phase {step.phase}</span>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-400 mb-6">{step.description}</p>

                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const processSteps = [
  {
    phase: 1,
    title: "Discovery & Strategy",
    description:
      "We begin by understanding your business, goals, target audience, and competitive landscape to develop a comprehensive digital strategy.",
    deliverables: [
      "Detailed project brief",
      "Competitive analysis",
      "User personas",
      "Strategic roadmap",
      "Project timeline",
    ],
  },
  {
    phase: 2,
    title: "Planning & Architecture",
    description:
      "We create the blueprint for your website, mapping out the user journey, information architecture, and technical requirements.",
    deliverables: ["Sitemap", "User flow diagrams", "Wireframes", "Technical specifications", "Content strategy"],
  },
  {
    phase: 3,
    title: "Design & User Experience",
    description:
      "Our designers create visually stunning, on-brand mockups that prioritize user experience and conversion optimization.",
    deliverables: [
      "Brand implementation",
      "UI design mockups",
      "Responsive designs",
      "Interactive prototypes",
      "Design system",
    ],
  },
  {
    phase: 4,
    title: "Development & Integration",
    description:
      "Our development team brings the designs to life, building a robust, scalable website with all necessary integrations.",
    deliverables: [
      "Frontend development",
      "Backend systems",
      "CMS implementation",
      "Third-party integrations",
      "E-commerce functionality (if applicable)",
    ],
  },
  {
    phase: 5,
    title: "Testing & Quality Assurance",
    description:
      "We rigorously test every aspect of your website to ensure flawless functionality across all devices and browsers.",
    deliverables: [
      "Cross-browser testing",
      "Mobile responsiveness testing",
      "Performance optimization",
      "Security testing",
      "Accessibility compliance",
    ],
  },
  {
    phase: 6,
    title: "Launch & Post-Launch Support",
    description:
      "We carefully manage the launch process and provide ongoing support to ensure your website continues to perform optimally.",
    deliverables: [
      "Launch checklist",
      "Analytics setup",
      "SEO implementation",
      "Training and documentation",
      "Ongoing maintenance and support",
    ],
  },
]

