// Component Loader
class ComponentLoader {
    constructor() {
      this.cache = new Map()
    }
  
    async loadComponent(componentPath) {
      // キャッシュから取得
      if (this.cache.has(componentPath)) {
        return this.cache.get(componentPath)
      }
  
      try {
        const response = await fetch(componentPath)
        if (!response.ok) {
          throw new Error(`Failed to load component: ${componentPath}`)
        }
        const html = await response.text()
  
        // キャッシュに保存
        this.cache.set(componentPath, html)
        return html
      } catch (error) {
        console.error("Error loading component:", error)
        return ""
      }
    }
  
    async insertComponent(selector, componentPath) {
      const element = document.querySelector(selector)
      if (!element) {
        console.error(`Element not found: ${selector}`)
        return
      }
  
      const html = await this.loadComponent(componentPath)
      element.innerHTML = html
    }
  }
  
  // Global component loader instance
  const componentLoader = new ComponentLoader()
  
  // Load header and footer
  async function loadComponents() {
    try {
      // ヘッダーとフッターを並行して読み込み
      await Promise.all([
        componentLoader.insertComponent("#header-placeholder", "components/header.html"),
        componentLoader.insertComponent("#footer-placeholder", "components/footer.html"),
      ])
  
      // コンポーネント読み込み後の初期化
      initializeComponents()
    } catch (error) {
      console.error("Error loading components:", error)
    }
  }
  
  // Initialize components after loading
  function initializeComponents() {
    // アクティブなナビゲーションリンクを設定
    setActiveNavLink()
  
    // モバイルメニューの初期化
    initializeMobileMenu()
  }
  
  // Set active navigation link based on current page
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html"
    const navLinks = document.querySelectorAll(".nav-link")
  
    navLinks.forEach((link) => {
      link.classList.remove("active")
      const href = link.getAttribute("href")
  
      if (
        href === currentPage ||
        (currentPage === "" && href === "index.html") ||
        (currentPage === "index.html" && href === "index.html")
      ) {
        link.classList.add("active")
      }
    })
  }
  
  // Initialize mobile menu functionality
  function initializeMobileMenu() {
    const menuToggle = document.getElementById("menuToggle")
    const nav = document.getElementById("nav")
  
    if (!menuToggle || !nav) return
  
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
  
      // Animate hamburger menu
      const hamburgers = menuToggle.querySelectorAll(".hamburger")
      hamburgers.forEach((hamburger, index) => {
        if (nav.classList.contains("active")) {
          if (index === 0) {
            hamburger.style.transform = "rotate(45deg) translate(5px, 4px)"
          } else if (index === 1) {
            hamburger.style.opacity = "0"
          } else if (index === 2) {
            hamburger.style.transform = "rotate(-45deg) translate(5px, -4px)"
          }
        } else {
          hamburger.style.transform = "none"
          hamburger.style.opacity = "1"
        }
      })
    })
  
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active")
        const hamburgers = menuToggle.querySelectorAll(".hamburger")
        hamburgers.forEach((hamburger) => {
          hamburger.style.transform = "none"
          hamburger.style.opacity = "1"
        })
      })
    })
  }
  
  // Load components when DOM is ready
  document.addEventListener("DOMContentLoaded", loadComponents)
  