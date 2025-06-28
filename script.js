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
    // MOUSE
    this.paper.addEventListener("mousedown", (e) => {
      if (e.button !== 0 || this.holding) return;
      this.holding = true;
      this.startX = e.clientX - this.currentX;
      this.startY = e.clientY - this.currentY;

      this.paper.style.zIndex = highestZ++;

      this.playMusicIfHeart();
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.holding) return;
      this.currentX = e.clientX - this.startX;
      this.currentY = e.clientY - this.startY;
      this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    });

    document.addEventListener("mouseup", () => {
      this.holding = false;
    });

    // TOUCH
    this.paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      this.holding = true;
      this.startX = touch.clientX - this.currentX;
      this.startY = touch.clientY - this.currentY;

      this.paper.style.zIndex = highestZ++;

      this.playMusicIfHeart();
    });

    this.paper.addEventListener("touchmove", (e) => {
      if (!this.holding) return;
      const touch = e.touches[0];
      this.currentX = touch.clientX - this.startX;
      this.currentY = touch.clientY - this.startY;

      this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;

      e.preventDefault();
    });

    this.paper.addEventListener("touchend", () => {
      this.holding = false;
    });
  }

  playMusicIfHeart() {
    if (this.paper.classList.contains("paper") && !musicStarted) {
      const music = document.getElementById("bg-music");
      if (music) {
        // Try to resume context on iOS
        if (typeof AudioContext !== "undefined") {
          const context = new AudioContext();
          context.resume().then(() => {
            music.play().catch((err) => console.log("Music error:", err));
            musicStarted = true;
          });
        } else {
          music.play().catch((err) => console.log("Music error:", err));
          musicStarted = true;
        }
      }
    }
  }
}

// Initialize all .paper cards
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));

  // Folding letter logic
  document.querySelectorAll(".foldable").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });
});
