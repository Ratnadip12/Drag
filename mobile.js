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
    this.velX = 0;
    this.velY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.init();
  }

  init() {
    this.paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      const touch = e.touches[0];
      this.touchX = touch.clientX;
      this.touchY = touch.clientY;
      this.prevTouchX = this.touchX;
      this.prevTouchY = this.touchY;

      this.paper.style.zIndex = highestZ++;

      // Play music on first heart paper touch
      if (this.paper.classList.contains('heart') && !musicStarted) {
        const bgMusic = document.getElementById('bg-music');
        bgMusic.play();
        musicStarted = true;
      }
    });

    this.paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      const touch = e.touches[0];
      this.touchX = touch.clientX;
      this.touchY = touch.clientY;

      this.velX = this.touchX - this.prevTouchX;
      this.velY = this.touchY - this.prevTouchY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevTouchX = this.touchX;
      this.prevTouchY = this.touchY;

      this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
      e.preventDefault();
    });

    this.paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => new Paper(paper));
