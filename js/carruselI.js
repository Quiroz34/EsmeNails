const carousel = document.getElementById("carousel");
const slides = carousel.children.length;
let index = 0;

const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  index = (i + slides) % slides;
  carousel.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

document.getElementById("prev").addEventListener("click", () => showSlide(index - 1));
document.getElementById("next").addEventListener("click", () => showSlide(index + 1));

dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

setInterval(() => showSlide(index + 1), 4000);

showSlide(index);
