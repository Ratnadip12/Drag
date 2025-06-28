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
    this.init();
  }

  init() {
    // MOUSE EVENTS
    this.paper.addEventListener('mousedown', (e) => {
      if (e.button !== 0 || this.holding) return;
      this.holding = true;
      this.startX = e.clientX - this.currentX;
      this.startY = e.clientY - this.currentY;

      this.paper.style.zIndex = highestZ++;

      this.playMusicIfNeeded();
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.holding) return;
      this.currentX = e.clientX - this.startX;
      this.currentY = e.clientY - this.startY;
      this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    });

    document.addEventListener('mouseup', () => {
      this.holding = false;
    });

    // TOUCH EVENTS
    this.paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.holding = true;
      this.startX = touch.clientX - this.currentX;
      this.startY = touch.clientY - this.currentY;

      this.paper.style.zIndex = highestZ++;

      this.playMusicIfNeeded();
    });

    this.paper.addEventListener('touchmove', (e) => {
      if (!this.holding) return;

      const touch = e.touches[0];
      this.currentX = touch.clientX - this.startX;
      this.currentY = touch.clientY - this.startY;

      this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;

      e.preventDefault(); // prevent scrolling while dragging
    });

    this.paper.addEventListener('touchend', () => {
      this.holding = false;
    });
  }

  playMusicIfNeeded() {
    if (!musicStarted) {
      const music = document.getElementById("bg-music");
      if (music) {
        music.play().catch(err => console.log("Music autoplay blocked:", err));
        musicStarted = true;
      }
    }

    // ❗If you only want to play on dragging `.heart` card, use this instead:
    // if (this.paper.classList.contains("heart") && !musicStarted) { ... }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const papers = document.querySelectorAll('.paper');
  papers.forEach(paper => new Paper(paper));
});
