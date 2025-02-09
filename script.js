document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".pixel-border-card");
    const circles = document.querySelectorAll(".circle");
    
    circles.forEach(circle => {
        circle.addEventListener("click", (e) => {
            e.stopPropagation();
            const rect = circle.getBoundingClientRect();
            card.style.display = "block";
            card.style.top = `${rect.bottom + 5}px`;
            card.style.left = `${rect.left - 50}px`; 
        });
    });

    document.addEventListener("click", (e) => {
        if (!card.contains(e.target)) {
            card.style.display = "none";
        }
    });
});