document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".pixel-border-card");
    const circles = document.querySelectorAll(".circle");
    const timelineContainer = document.querySelector(".d-flex.justify-content-center");
  
    circles.forEach(circle => {
      circle.addEventListener("click", (e) => {
        e.stopPropagation();
        const circleRect = circle.getBoundingClientRect();
        const containerRect = timelineContainer.getBoundingClientRect();
  
        card.style.display = "block";
        card.style.left = `${circleRect.left - containerRect.left + circle.offsetWidth/2}px`;
        card.style.bottom = `${containerRect.bottom - circleRect.top + 20}px`;
      });
    });
  
    document.addEventListener("click", (e) => {
      if (!card.contains(e.target)) card.style.display = "none";
    });
  });