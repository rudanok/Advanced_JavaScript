document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;

  const sliderDotsContainer = document.querySelector(".slider-dots");
  const sliderImages = document.querySelector(".slider").children;

  // Добавляем навигационные точки и вешаем на каждую addEventListener
  for (let i = 0; i < sliderImages.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    sliderDotsContainer.append(dot);

    dot.addEventListener("click", function () {
      showSlide(i);
    });
  }

  // Вешаем addEventListener на кнопки
  document.querySelector(".prev-btn").addEventListener("click", function () {
    showSlide(slideIndex - 1);
  });

  document.querySelector(".next-btn").addEventListener("click", function () {
    showSlide(slideIndex + 1);
  });

  const dots = document.querySelectorAll(".dot");

  // Основная функция отображения слайда
  function showSlide(index) {
    if (index >= sliderImages.length) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = sliderImages.length - 1;
    } else {
      slideIndex = index;
    }

    // Скрываем фото, удаляем активную точку
    for (let i = 0; i < sliderImages.length; i++) {
      sliderImages[i].style.display = "none";
      dots[i].classList.remove("active");
    }

    // Отображаем текущее фото и устанавливаем активность точки
    sliderImages[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
  }

  showSlide(slideIndex);
});
