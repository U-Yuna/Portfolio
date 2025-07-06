document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let current = 0;
  const interval = 8000; // 5秒ごとにスライド

  if (slides.length <= 1) return; // スライドが1枚なら何もしない

  function showSlide(next) {
    slides[current].classList.remove("active");
    slides[current].classList.add("prev");

    slides[next].classList.add("active");

    // 600ms後に前スライドを非表示状態に戻す
    setTimeout(() => {
      slides[current].classList.remove("prev");
      current = next;
    }, 800); // CSSのtransitionと揃える
  }

  setInterval(() => {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }, interval);
});
