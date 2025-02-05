function highlight(index) {
    const circles = document.querySelectorAll('.circle');
    const line = document.querySelector('.timeline-line');
    const circleWidth = circles[0].offsetWidth;
    const lineWidth = line.offsetWidth;
  
    let fillWidth = (lineWidth / 3) * (index + 1);
    line.style.width = fillWidth + 'px';
  }