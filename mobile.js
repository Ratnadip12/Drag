let highestZ = 1;
let musicStarted = false;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holding = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.init();
  }

  init() {
    this.paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.startX = touch.clientX - this.offsetX;
      this.startY = touch.clientY - this.offsetY;
      this.holding = true;

      this.paper.style.zIndex = highestZ++;
      if (this.paper.classList.contains('heart') && !musicStarted) {
        const music = document.getElementById('bg-music');
        if (music) {
          music.play().catch(err => console.log("Autoplay error:", err));
          musicStarted = true;
        }
      }
    });

    this.paper.addEventListener('touchmove', (e) => {
      if (!this.holding) return;
      const touch = e.touches[0];

      this.offsetX = touch.clientX - this.startX;
      this.offsetY = touch.clientY - this.startY;

      this.paper.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
      e.preventDefault();
    });

    this.paper.addEventListener('touchend', () => {
      this.holding = false;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const papers = document.querySelectorAll('.paper');
  papers.forEach(paper => new Paper(paper));
});
