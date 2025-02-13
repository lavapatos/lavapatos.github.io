document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".pixel-border-card");
  const circles = document.querySelectorAll(".circle");
  const timelineContainer = document.querySelector(".timeline-container");

  circles.forEach(circle => {
    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      const containerRect = timelineContainer.getBoundingClientRect();
      const circleRect = circle.getBoundingClientRect();
      
      const leftPosition = circleRect.left - containerRect.left - (card.offsetWidth / 2) + (circle.offsetWidth / 2);
      const maxLeft = containerRect.width - card.offsetWidth;
      
      card.style.left = `${Math.min(Math.max(leftPosition, 10), maxLeft - 10)}px`;
      card.style.display = "block";
    });
  });

  document.addEventListener("click", (e) => {
    if (!card.contains(e.target)) card.style.display = "none";
  });
});