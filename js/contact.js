// Contact Form Handler with EmailJS
class ContactForm {
    constructor() {
      this.form = document.getElementById("contactForm")
      this.submitBtn = document.getElementById("submit-btn")
      this.successMessage = document.getElementById("success-message")
      this.errorMessage = document.getElementById("error-message")
  
      // EmailJS configuration
      this.emailjsConfig = {
        serviceId: "service_wabjzvh", // EmailJSで取得したService ID
        templateId: "template_ygulsgj", // EmailJSで作成したTemplate ID
        publicKey: "40s9UVCJ7CeNqy8rr", // EmailJSのPublic Key
      }
  
      this.init()
    }
  
    init() {
      // Initialize EmailJS
      window.emailjs.init(this.emailjsConfig.publicKey)
  
      // Add event listeners
      if (this.form) {
        this.form.addEventListener("submit", this.handleSubmit.bind(this))
  
        // Real-time validation
        const inputs = this.form.querySelectorAll("input, textarea")
        inputs.forEach((input) => {
          input.addEventListener("blur", () => this.validateField(input))
          input.addEventListener("input", () => this.clearError(input))
        })
      }
    }
  
    async handleSubmit(e) {
      e.preventDefault()
  
      // Validate form
      if (!this.validateForm()) {
        return
      }
  
      // Show loading state
      this.setLoadingState(true)
      this.hideMessages()
  
      try {
        // Get form data
        const formData = new FormData(this.form)
        const templateParams = {
          user_name: formData.get("user_name"),
          user_email: formData.get("user_email"),
          subject: formData.get("subject") || "ポートフォリオサイトからのお問い合わせ",
          message: formData.get("message"),
          to_email: "contact@example.com", // 受信用メールアドレス
        }
  
        // Send email via EmailJS
        const response = await window.emailjs.send(
          this.emailjsConfig.serviceId,
          this.emailjsConfig.templateId,
          templateParams,
        )
  
        console.log("Email sent successfully:", response)
        this.showSuccessMessage()
        this.form.reset()
      } catch (error) {
        console.error("Email send failed:", error)
        this.showErrorMessage()
  
        // Fallback to mailto
        this.fallbackToMailto(formData)
      } finally {
        this.setLoadingState(false)
      }
    }
  
    validateForm() {
      let isValid = true
      const requiredFields = ["user_name", "user_email", "message", "privacy_agree"]
  
      requiredFields.forEach((fieldName) => {
        const field = this.form.querySelector(`[name="${fieldName}"]`)
        if (!this.validateField(field)) {
          isValid = false
        }
      })
  
      return isValid
    }
  
    validateField(field) {
      const value = field.value.trim()
      const fieldName = field.name
      let isValid = true
      let errorMessage = ""
  
      // Clear previous error
      this.clearError(field)
  
      switch (fieldName) {
        case "user_name":
          if (!value) {
            errorMessage = "お名前を入力してください"
            isValid = false
          } else if (value.length < 1) {
            errorMessage = "お名前は1文字以上で入力してください"
            isValid = false
          }
          break
  
        case "user_email":
          if (!value) {
            errorMessage = "メールアドレスを入力してください"
            isValid = false
          } else if (!this.isValidEmail(value)) {
            errorMessage = "正しいメールアドレスを入力してください"
            isValid = false
          }
          break
  
        case "message":
          if (!value) {
            errorMessage = "メッセージを入力してください"
            isValid = false
          } else if (value.length < 10) {
            errorMessage = "メッセージは10文字以上で入力してください"
            isValid = false
          }
          break
  
        case "privacy_agree":
          if (!field.checked) {
            errorMessage = "プライバシーポリシーに同意してください"
            isValid = false
          }
          break
      }
  
      if (!isValid) {
        this.showFieldError(field, errorMessage)
      }
  
      return isValid
    }
  
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    showFieldError(field, message) {
      const errorElement = document.getElementById(`${field.name.replace("_", "-")}-error`)
      if (errorElement) {
        errorElement.textContent = message
        errorElement.style.display = "block"
      }
      field.classList.add("error")
    }
  
    clearError(field) {
      const errorElement = document.getElementById(`${field.name.replace("_", "-")}-error`)
      if (errorElement) {
        errorElement.style.display = "none"
      }
      field.classList.remove("error")
    }
  
    setLoadingState(loading) {
      const btnText = this.submitBtn.querySelector(".btn-text")
      const btnLoading = this.submitBtn.querySelector(".btn-loading")
  
      if (loading) {
        btnText.style.display = "none"
        btnLoading.style.display = "flex"
        this.submitBtn.disabled = true
      } else {
        btnText.style.display = "block"
        btnLoading.style.display = "none"
        this.submitBtn.disabled = false
      }
    }
  
    showSuccessMessage() {
      this.hideMessages()
      this.successMessage.style.display = "flex"
      this.successMessage.scrollIntoView({ behavior: "smooth", block: "center" })
  
      // Auto hide after 5 seconds
      setTimeout(() => {
        this.successMessage.style.display = "none"
      }, 5000)
    }
  
    showErrorMessage() {
      this.hideMessages()
      this.errorMessage.style.display = "flex"
      this.errorMessage.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  
    hideMessages() {
      this.successMessage.style.display = "none"
      this.errorMessage.style.display = "none"
    }
  
    fallbackToMailto(formData) {
      const subject = encodeURIComponent(formData.get("subject") || "ポートフォリオサイトからのお問い合わせ")
      const body = encodeURIComponent(
        `お名前: ${formData.get("user_name")}\n` +
          `メールアドレス: ${formData.get("user_email")}\n\n` +
          `メッセージ:\n${formData.get("message")}`,
      )
  
      const mailtoLink = `mailto:contact@example.com?subject=${subject}&body=${body}`
      window.location.href = mailtoLink
    }
  }
  
  // Initialize contact form when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Wait for components to load
    setTimeout(() => {
      new ContactForm()
    }, 100)
  })
  
  // EmailJS Setup Instructions (for development)
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    console.log(`
      📧 EmailJS Setup Instructions:
      
      1. Go to https://www.emailjs.com/ and create an account
      2. Create a new service (Gmail, Outlook, etc.)
      3. Create an email template with these variables:
         - {{user_name}}
         - {{user_email}} 
         - {{subject}}
         - {{message}}
         - {{to_email}}
      4. Get your Service ID, Template ID, and Public Key
      5. Update the emailjsConfig in js/contact.js
      
      Template example:
      Subject: {{subject}}
      
      From: {{user_name}} ({{user_email}})
      
      Message:
      {{message}}
    `)
  }
  