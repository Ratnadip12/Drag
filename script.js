let highestZ = 1;
let musicStarted = false;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      if (this.holdingPaper) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
      }
    });

    this.paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      this.paper.style.zIndex = highestZ++;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      // Play background music if it's the heart paper
      if (this.paper.classList.contains('paper') && !musicStarted) {
        const bgMusic = document.getElementById('bg-music');
        bgMusic.play();
        musicStarted = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });
  }


  // touch_code
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

      // Play background music if it's the heart paper
      if (this.paper.classList.contains('paper') && !musicStarted) {
        const bgMusic = document.getElementById('bg-music');
        bgMusic.play();
        musicStarted = true;
      }
    });

    this.paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }

  
}



 function toggleFold(element) {
    element.classList.toggle('open');
  }
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => new Paper(paper));







