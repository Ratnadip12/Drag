let highestZ = 1;
let musicStarted = false;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.dragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.init();
  }

  init() {
    this.paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];

      this.dragging = true;
      this.startX = touch.clientX - this.currentX;
      this.startY = touch.clientY - this.currentY;

      this.paper.style.zIndex = highestZ++;
      
      if (this.paper.classList.contains("heart") && !musicStarted) {
        const music = document.getElementById("bg-music");
        if (music) {
          music.play().catch((err) => console.log("Music autoplay error:", err));
          musicStarted = true;
        }
      }
    });

    this.paper.addEventListener("touchmove", (e) => {
      if (!this.dragging) return;

      const touch = e.touches[0];
      this.currentX = touch.clientX - this.startX;
      this.currentY = touch.clientY - this.startY;

      this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;

      e.preventDefault();
    });

    this.paper.addEventListener("touchend", () => {
      this.dragging = false;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const papers = document.querySelectorAll(".paper");
  papers.forEach((paper) => new Paper(paper));
});
