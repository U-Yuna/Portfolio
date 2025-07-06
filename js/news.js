// News Data Manager
class NewsManager {
    constructor() {
      this.newsData = []
      this.loadNews()
    }
  
    async loadNews() {
      try {
        const response = await fetch("data/news.json")
        this.newsData = await response.json()
      } catch (error) {
        console.error("Failed to load news data:", error)
        // Fallback data
        this.newsData = [
          {
            id: 1,
            date: "2025.02.15",
            category: "受賞",
            title: "技育CAMPハッカソンで努力賞を受賞しました",
            description: "Traublingプロジェクトで技育CAMPハッカソンの努力賞をいただきました。",
            tags: ["ハッカソン", "受賞", "Traubling"],
          },
          {
            id: 2,
            date: "2024.12.10",
            category: "受賞",
            title: "Intelligent Water Rocket Competition 2024で総合優勝",
            description: "東海大学主催の大会でチーム一丸となって取り組み、総合優勝を果たしました。",
            tags: ["コンペティション", "優勝", "IoT"],
          },
        ]
      }
    }
  
    getAllNews() {
      return this.newsData
    }
  
    getRecentNews(limit = 3) {
      return this.newsData.slice(0, limit)
    }
  
    getNewsByCategory(category) {
      return this.newsData.filter((news) => news.category === category)
    }
  
    renderNewsItem(news, isPreview = false) {
      return `
        <article class="news-item ${isPreview ? "news-preview-item" : ""}">
          <div class="news-date">
            <time datetime="${news.date.replace(/\./g, "-")}">${news.date}</time>
          </div>
          <div class="news-content">
            <div class="news-meta">
              <span class="news-category">${news.category}</span>
            </div>
            <h3 class="news-title">${news.title}</h3>
            ${!isPreview ? `<p class="news-description">${news.description}</p>` : ""}
          </div>
        </article>
      `
    }
  
    renderNewsList(newsArray, isPreview = false) {
      return newsArray.map((news) => this.renderNewsItem(news, isPreview)).join("")
    }
  }
  
  // Global news manager instance
  const newsManager = new NewsManager()
  
  // Initialize news on page load
  document.addEventListener("DOMContentLoaded", async () => {
    // Wait for news data to load
    await newsManager.loadNews()
  
    // Load news for different pages
    const newsContainer = document.getElementById("news-container")
    const newsPreviewContainer = document.getElementById("news-preview-container")
  
    if (newsContainer) {
      // Full news page
      const allNews = newsManager.getAllNews()
      newsContainer.innerHTML = newsManager.renderNewsList(allNews)
    }
  
    if (newsPreviewContainer) {
      // Main page preview
      const recentNews = newsManager.getRecentNews(3)
      newsPreviewContainer.innerHTML = newsManager.renderNewsList(recentNews, true)
    }
  })
  