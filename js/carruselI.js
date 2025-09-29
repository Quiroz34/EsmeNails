const carousel = document.getElementById("carousel");
const slides = carousel.children.length;
let index = 0;

function showSlide(i) {
  index = (i + slides) % slides;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById("prev").addEventListener("click", () => showSlide(index - 1));
document.getElementById("next").addEventListener("click", () => showSlide(index + 1));

setInterval(() => showSlide(index + 1), 4000); // cambio automático cada 4s
