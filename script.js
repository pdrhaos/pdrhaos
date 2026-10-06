function comprar() {

  const toast = document.getElementById("toast");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);

}


// Efeito suave ao aparecer na tela

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(
    ".feature-card, .rooster-card, .gallery-item, .schedule-item, .ticket, .charity-photo, .charity-content, .music-content"
  )
  .forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";

    observer.observe(element);

  });


document.addEventListener("scroll", () => {

  document
    .querySelectorAll(".visible")
    .forEach(element => {

      element.style.opacity = "1";
      element.style.transform = "translateY(0)";

    });

});
