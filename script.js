document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".pixel-border-card");
  const circles = document.querySelectorAll(".circle");
  const timelineLine = document.querySelector(".timeline-line");

  const cardsData = [
    {
      title: "CruzRoja",
      text: "blablabla",
      tags: ["Tobar", "Teleco", "Tag1"]
    },
    {
      title: "AyudanteTulon",
      text: "blablabla",
      tags: ["LaTex", "tag2", "tag1"]
    },
    {
      title: "Tutor",
      text: "blablabla",
      tags: ["EDA", "tag2", "tag1"]
    },
    {
      title: "MesaEstudio",
      text: "blablabla",
      tags: ["tag3", "tag2", "tag1"]
    }
  ];

  circles.forEach((circle, index) => {
    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      circles.forEach(c => c.classList.remove("active-circle"));
      circle.classList.add("active-circle");
      const data = cardsData[index];
      card.querySelector("h5").textContent = data.title;
      card.querySelector("p").textContent = data.text;
      
      const badges = card.querySelectorAll(".badge");
      badges.forEach(badge => badge.remove());
      
      data.tags.forEach((tag, tagIndex) => {
        const badge = document.createElement("div");
        badge.className = "badge bg-dark";
        if (tagIndex !== data.tags.length - 1) badge.classList.add("mb-2");
        badge.textContent = tag;
        card.querySelector("p").after(badge);
      });

      const container = document.querySelector(".timeline-container");
      const containerRect = container.getBoundingClientRect();
      const circleRect = circle.getBoundingClientRect();
      const circleCenterX = circleRect.left - containerRect.left + circleRect.width/2;

      card.style.display = "block";
      const cardWidth = card.offsetWidth;

      if(index === 0) {
        card.style.left = `${circleCenterX}px`;
        card.style.right = "auto";
        card.style.transform = "none";
      } else if(index === 3) {
        card.style.right = `${containerRect.width - circleCenterX}px`;
        card.style.left = "auto";
        card.style.transform = "none";
      } else {
        card.style.left = `${circleCenterX - 125}px`;
        card.style.right = "auto";
        card.style.transform = "none";
      }

      timelineLine.style.marginTop = "220px";
    });
  });

  document.addEventListener("click", (e) => {
    if (!card.contains(e.target)) {
      circles.forEach(c => c.classList.remove("active-circle"));
      card.style.display = "none";
      timelineLine.style.marginTop = "0";
    }
  });
});