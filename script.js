document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".pixel-border-card");
  const circles = document.querySelectorAll(".circle");
  const timelineLine = document.querySelector(".timeline-line");

  const cardsData = [
    {title:"CruzRoja",text:"blablabla",tags:["Tobar","Teleco","Tag1"]},
    {title:"AyudanteTulon",text:"blablabla",tags:["LaTex","tag2","tag1"]},
    {title:"Tutor",text:"blablabla",tags:["EDA","tag2","tag1"]},
    {title:"MesaEstudio",text:"blablabla",tags:["tag3","tag2","tag1"]}
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
      card.classList.add("active-card");
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
      timelineLine.style.marginTop = "240px";
    });
  });

  document.addEventListener("click", (e) => {
    const clickedSkill = e.target.closest('.skill-block');
    const clickedCircle = e.target.closest('.circle');
    const clickedCard = e.target.closest('.pixel-border-card');
    if (!clickedSkill && !clickedCircle && !clickedCard) {
      document.querySelectorAll('.skill-block').forEach(b => b.classList.remove('clicked'));
      document.querySelectorAll('.text-insert').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.skills-grid-container').forEach(c => c.style.gridGap = '4px');
      circles.forEach(c => c.classList.remove("active-circle"));
      card.style.display = "none";
      card.classList.remove("active-card");
      timelineLine.style.marginTop = "0";
    }
  });

  circles[0].click();
});

document.querySelectorAll('.skill-block').forEach(block => {
  block.addEventListener('click', function(e) {
    e.stopPropagation();
    const container = this.closest('.skills-grid-container');
    const isMobile = window.innerWidth < 768;
    let textInsert = container.querySelector('.text-insert');
    
    if (!textInsert) {
      textInsert = document.createElement('div');
      textInsert.className = 'text-insert';
      if (!isMobile) container.children[3].after(textInsert);
      else container.append(textInsert);
    }

    if (isMobile) {
      const allSkills = Array.from(container.querySelectorAll('.skill-block'));
      const index = allSkills.indexOf(this);
      const containerRect = container.getBoundingClientRect();
      const gridGap = 8;

      let topPos = 0;
      let bottomPos = 0;

      if (index === 0) {
        const currentRect = this.getBoundingClientRect();
        const nextRect = allSkills[1].getBoundingClientRect();
        topPos = currentRect.top - containerRect.top;
        bottomPos = nextRect.bottom - containerRect.top;
      } else if (index === allSkills.length - 1) {
        const currentRect = this.getBoundingClientRect();
        const prevRect = allSkills[index-1].getBoundingClientRect();
        topPos = prevRect.top - containerRect.top;
        bottomPos = currentRect.bottom - containerRect.top;
      } else {
        const prevRect = allSkills[index-1].getBoundingClientRect();
        const nextRect = allSkills[index+1].getBoundingClientRect();
        topPos = prevRect.top + (prevRect.height/2) - containerRect.top;
        bottomPos = nextRect.top + (nextRect.height/2) - containerRect.top;
      }

      textInsert.style.top = `${topPos}px`;
      textInsert.style.height = `${bottomPos - topPos}px`;
    }

    const wasActive = this.classList.contains('clicked');
    
    document.querySelectorAll('.text-insert').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.skill-block').forEach(b => b.classList.remove('clicked'));
    
    if (!wasActive) {
      this.classList.add('clicked');
      textInsert.textContent = "skillname (placeholder): " + this.querySelector('.skill-name').textContent;
      textInsert.classList.add('active');
      if (!isMobile) container.style.gridGap = '24px';
    } else {
      if (!isMobile) container.style.gridGap = '4px';
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    document.querySelectorAll('.text-insert').forEach(t => t.remove());
    document.querySelectorAll('.skill-block').forEach(b => b.classList.remove('clicked'));
  }
});