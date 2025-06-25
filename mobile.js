let highestZ = 1;
let musicStarted = false;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.touchX = 0;
    this.touchY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.init();
  }

  init() {
    this.paper.addEventListener('touchstart', (e) => {
      this.holdingPaper = true;

      const touch = e.touches[0];
      this.touchX = this.prevTouchX = touch.clientX;
      this.touchY = this.prevTouchY = touch.clientY;

      this.paper.style.zIndex = highestZ++;

      if (this.paper.classList.contains('heart') && !musicStarted) {
        const music = document.getElementById('bg-music');
        music.play();
        musicStarted = true;
      }
    });

    this.paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      const touch = e.touches[0];
      this.touchX = touch.clientX;
      this.touchY = touch.clientY;

      const deltaX = this.touchX - this.prevTouchX;
      const deltaY = this.touchY - this.prevTouchY;

      this.currentPaperX += deltaX;
      this.currentPaperY += deltaY;

      this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;

      this.prevTouchX = this.touchX;
      this.prevTouchY = this.touchY;

      e.preventDefault();
    });

    this.paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => new Paper(paper));
