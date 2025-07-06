// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
  
  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)
  
  // Observe all sections
  document.addEventListener("DOMContentLoaded", () => {
    // Wait for components to load before observing
    setTimeout(() => {
      const sections = document.querySelectorAll(".section")
      sections.forEach((section) => {
        observer.observe(section)
      })
    }, 100)
  })
  
  // Header Background on Scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (header) {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(245, 245, 244, 0.95)"
      } else {
        header.style.backgroundColor = "rgba(245, 245, 244, 0.9)"
      }
    }
  })
  
  // Form Validation
  function validateForm(form) {
    const inputs = form.querySelectorAll("input[required], textarea[required]")
    let isValid = true
  
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "#ef4444"
        isValid = false
      } else {
        input.style.borderColor = "#d1d5db"
      }
    })
  
    return isValid
  }
  
  // Email Validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  
  // Utility Functions
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  // Resize Handler
  const handleResize = debounce(() => {
    const nav = document.getElementById("nav")
    if (nav && window.innerWidth > 768) {
      nav.classList.remove("active")
      const hamburgers = document.querySelectorAll(".hamburger")
      hamburgers.forEach((hamburger) => {
        hamburger.style.transform = "none"
        hamburger.style.opacity = "1"
      })
    }
  }, 250)
  
  window.addEventListener("resize", handleResize)
  
  // Loading Animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
  
  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const nav = document.getElementById("nav")
      if (nav && nav.classList.contains("active")) {
        nav.classList.remove("active")
        const hamburgers = document.querySelectorAll(".hamburger")
        hamburgers.forEach((hamburger) => {
          hamburger.style.transform = "none"
          hamburger.style.opacity = "1"
        })
      }
    }
  })
  
  // Performance Optimization
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      console.log("Portfolio site loaded successfully")
    })
  }
  