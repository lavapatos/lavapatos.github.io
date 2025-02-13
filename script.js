document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".pixel-border-card");
  const circles = document.querySelectorAll(".circle");
  const timelineLine = document.querySelector(".timeline-line");

  circles.forEach(circle => {
    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      card.style.display = "block";
      timelineLine.style.marginTop = "220px";
    });
  });

  document.addEventListener("click", (e) => {
    if (!card.contains(e.target)) {
      card.style.display = "none";
      timelineLine.style.marginTop = "0";
    }
  });
});