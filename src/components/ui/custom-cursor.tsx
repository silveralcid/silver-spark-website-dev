'use client'

import { useEffect } from 'react'

export function CustomCursor() {
  useEffect(() => {
    // Variables to track cursor movement and particle count
    let lastX = 0,
      lastY = 0
    let particleCount = 0
    const maxParticles = 100

    // Variables for heat haze effect
    let hazeElement: HTMLDivElement | null = null
    let hazeTimeout: NodeJS.Timeout | null = null

    // Custom matchstick cursor element
    let matchstickCursor: HTMLDivElement | null = null
    let flameTip: HTMLDivElement | null = null

    // Add the CSS styles
    const style = document.createElement('style')
    style.textContent = `
      /* Hide default cursor on all elements */
      body, a, button, [role="button"], input, select, textarea {
        cursor: none !important;
      }
      
      /* Matchstick cursor styles */
      .matchstick-cursor {
        position: fixed;
        width: 2.25px;
        height: 18px;
        pointer-events: none;
        z-index: 9999;
        transform-origin: top center;
        transform: translate(-1.125px, 0) rotate(-15deg);
      }

      .flame-tip {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3.75px;
        background: radial-gradient(ellipse at center, #ff5722 0%, #ff9800 100%);
        border-radius: 50% 50% 35% 35%;
        box-shadow: 0 0 4px rgba(255, 87, 34, 0.8);
        opacity: 1;
        transition: opacity 0.1s ease, box-shadow 0.1s ease, transform 0.1s ease;
      }

      .matchstick-cursor::after {
        content: '';
        position: absolute;
        top: 3px;
        left: 0;
        width: 100%;
        height: 15px;
        background: linear-gradient(to bottom, #d7ccc8 0%, #a1887f 100%);
        border-radius: 0 0 1.5px 1.5px;
      }
      
      .spark {
        position: fixed;
        width: 3px;
        height: 3px;
        background: radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(255,69,0,1) 100%);
        border-radius: 50%;
        box-shadow: 0 0 11px rgba(255, 165, 0, 0.9);
        opacity: 1;
        pointer-events: none;
        z-index: 9000;
      }
      
      .click-spark {
        position: fixed;
        width: 2.25px;
        height: 2.25px;
        background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,165,0,1) 100%);
        border-radius: 50%;
        box-shadow: 0 0 7.5px rgba(255, 165, 0, 0.9);
        opacity: 1;
        pointer-events: none;
        z-index: 9000;
      }

      .smoke {
        position: fixed;
        width: 9px;
        height: 9px;
        background: rgba(169, 169, 169, 0.3);
        border-radius: 50%;
        filter: blur(7.5px);
        opacity: 0.7;
        pointer-events: none;
        z-index: 8999;
      }
      
      .heat-haze {
        position: fixed;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.01);
        filter: blur(6px) contrast(15);
        mix-blend-mode: overlay;
        pointer-events: none;
        z-index: 8998;
        transform: translate(-50%, -50%);
        opacity: 0.3;
      }
      
      @keyframes distort {
        0% {
          border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          filter: blur(6px) contrast(15);
        }
        50% {
          border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          filter: blur(7.5px) contrast(20);
        }
        100% {
          border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          filter: blur(6px) contrast(15);
        }
      }
    `
    document.head.appendChild(style)

    // Create matchstick cursor
    function createMatchstickCursor() {
      matchstickCursor = document.createElement('div')
      matchstickCursor.className = 'matchstick-cursor'
      document.body.appendChild(matchstickCursor)

      // Create flame tip as a separate element for better control
      flameTip = document.createElement('div')
      flameTip.className = 'flame-tip'
      matchstickCursor.appendChild(flameTip)
    }

    // Create heat haze element
    function createHeatHaze() {
      if (hazeElement) {
        document.body.removeChild(hazeElement)
      }

      hazeElement = document.createElement('div')
      hazeElement.className = 'heat-haze'
      document.body.appendChild(hazeElement)

      // Apply animation
      hazeElement.style.animation = 'distort 3s infinite alternate ease-in-out'
    }

    // Function to create random flicker effect for the flame
    function startFlameFlicker() {
      if (!flameTip) return

      // Base values for the flame
      const baseOpacity = 1
      const baseShadow = '0 0 5px rgba(255, 87, 34, 0.8)'
      const baseScale = 1

      // Function to generate random flicker
      const flicker = () => {
        if (!flameTip) return

        // Random values for this flicker
        const opacityVariation = 0.7 + Math.random() * 0.3 // 0.7-1.0
        const shadowIntensity = 0.6 + Math.random() * 0.8 // 0.6-1.4
        const scaleVariation = 0.85 + Math.random() * 0.3 // 0.85-1.15

        // Apply the random values
        flameTip.style.opacity = (baseOpacity * opacityVariation).toString()
        flameTip.style.boxShadow = `0 0 ${3.75 + shadowIntensity * 3.75}px rgba(255, 87, 34, ${0.6 + shadowIntensity * 0.4})`
        flameTip.style.transform = `scaleX(${baseScale * scaleVariation}) scaleY(${baseScale * (scaleVariation + 0.1)})`

        // Random timing for next flicker (between 50ms and 500ms)
        // More weighted toward shorter times for a more natural flicker
        const nextTime =
          Math.random() < 0.7
            ? 50 + Math.random() * 150 // 70% chance of short flicker (50-200ms)
            : 200 + Math.random() * 300 // 30% chance of longer pause (200-500ms)

        setTimeout(flicker, nextTime)
      }

      // Start the flicker effect
      flicker()
    }

    // Initialize custom cursor and heat haze
    createMatchstickCursor()
    createHeatHaze()
    startFlameFlicker()

    // Event listener for mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      // Update matchstick cursor position
      if (matchstickCursor) {
        matchstickCursor.style.left = `${e.clientX}px`
        matchstickCursor.style.top = `${e.clientY}px`
      }

      // Calculate the speed of the mouse movement by measuring the distance traveled
      const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY)

      // Update heat haze position with slight lag for mirage effect
      if (hazeElement) {
        // Clear any existing timeout
        if (hazeTimeout) {
          clearTimeout(hazeTimeout)
        }

        // Set a timeout to create a slight delay in the heat haze movement
        hazeTimeout = setTimeout(() => {
          if (hazeElement) {
            hazeElement.style.left = `${e.clientX}px`
            hazeElement.style.top = `${e.clientY}px`

            // Adjust opacity based on movement speed
            const opacityValue = Math.min(0.3, 0.1 + speed * 0.01)
            hazeElement.style.opacity = opacityValue.toString()

            // Adjust size based on movement speed
            const sizeValue = Math.min(90, 60 + speed * 0.375)
            hazeElement.style.width = `${sizeValue}px`
            hazeElement.style.height = `${sizeValue}px`
          }
        }, 50) // 50ms delay for lag effect
      }

      lastX = e.clientX
      lastY = e.clientY

      // Only create particles if the speed of the mouse movement is greater than 5
      if (speed > 5) {
        // Use requestAnimationFrame to optimize animation performance
        requestAnimationFrame(() => {
          // Limit the number of particles created
          if (particleCount < maxParticles) {
            createSpark(e.clientX, e.clientY, speed)
            createSmoke(e.clientX, e.clientY, speed)
            particleCount++
          }
        })
      }
    }

    // Event listener for mouse clicks
    const handleMouseClick = (e: MouseEvent) => {
      // Create a burst of click-sparks at the click position
      for (let i = 0; i < 12; i++) {
        createClickSpark(e.clientX, e.clientY)
      }

      // Emphasize flame glow with a quick flash effect
      if (flameTip) {
        flameTip.style.boxShadow = '0 0 15px rgba(255, 87, 34, 1)'
        setTimeout(() => {
          if (flameTip) {
            flameTip.style.boxShadow = '0 0 4px rgba(255, 87, 34, 0.8)'
          }
        }, 150)
      }
    }

    // Function to create spark particles at the cursor position
    function createSpark(x: number, y: number, speed: number) {
      const spark = document.createElement('div')
      spark.className = 'spark'
      document.body.appendChild(spark)

      // Calculate the size based on the mouse speed
      const size = Math.min(3, 1.5 + speed * 0.045)
      spark.style.width = `${size}px`
      spark.style.height = `${size}px`

      // Random velocity for the spark
      const angle = Math.random() * Math.PI * 2
      const velocity = Math.random() * 1.5 + 0.5
      const velocityX = Math.cos(angle) * velocity
      const velocityY = Math.sin(angle) * velocity - 1 // Upward bias

      // Animate the spark
      animateParticle(spark, x, y, velocityX, velocityY, Math.random() * 1000 + 500)
    }

    // Function to create click spark particles
    function createClickSpark(x: number, y: number) {
      const spark = document.createElement('div')
      spark.className = 'click-spark'
      document.body.appendChild(spark)

      // Random velocity for the spark with outward explosion pattern
      const angle = Math.random() * Math.PI * 2
      const velocity = Math.random() * 5 + 3 // Faster than regular sparks
      const velocityX = Math.cos(angle) * velocity
      const velocityY = Math.sin(angle) * velocity

      // Animate the click spark
      animateParticle(spark, x, y, velocityX, velocityY, Math.random() * 800 + 400)
    }

    // Function to create smoke particles at the cursor position
    function createSmoke(x: number, y: number, speed: number) {
      const smoke = document.createElement('div')
      smoke.className = 'smoke'
      document.body.appendChild(smoke)

      // Random velocity for the smoke with upward bias
      const angle = Math.random() * Math.PI
      const velocity = Math.random() * 0.5 + 0.2
      const velocityX = Math.cos(angle) * velocity
      const velocityY = Math.sin(angle) * velocity - 0.8 // Strong upward bias

      // Animate the smoke particle
      animateParticle(smoke, x, y, velocityX, velocityY, Math.random() * 1500 + 1000)
    }

    // Function to animate a particle with physics
    function animateParticle(
      element: HTMLElement,
      x: number,
      y: number,
      velocityX: number,
      velocityY: number,
      lifespan: number,
    ) {
      const startTime = performance.now()
      const gravity = 0.05
      let posX = x
      let posY = y

      function frame(time: number) {
        const elapsed = time - startTime
        if (elapsed >= lifespan) {
          element.remove()
          particleCount--
          return
        }

        // Apply physics
        velocityY += gravity
        posX += velocityX
        posY += velocityY

        // Fade out based on elapsed time
        const opacity = 1 - elapsed / lifespan
        element.style.opacity = opacity.toString()

        // Position the particle
        element.style.left = `${posX}px`
        element.style.top = `${posY}px`

        // Request next frame
        requestAnimationFrame(frame)
      }

      requestAnimationFrame(frame)
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleMouseClick)

    // Clean up event listeners and elements on unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleMouseClick)

      if (matchstickCursor) {
        document.body.removeChild(matchstickCursor)
      }

      if (hazeElement) {
        document.body.removeChild(hazeElement)
      }

      if (style) {
        document.head.removeChild(style)
      }

      // Remove any remaining particles
      document.querySelectorAll('.spark, .click-spark, .smoke').forEach((element) => {
        element.remove()
      })
    }
  }, [])

  return null
}
