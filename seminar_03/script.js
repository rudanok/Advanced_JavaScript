let likeCount = 0;
let imageHistory = [];

document.addEventListener("DOMContentLoaded", () => {
  loadRandomImage();

  const likeButton = document.getElementById("likeButton");
  const nextButton = document.getElementById("nextButton");

  likeButton.addEventListener("click", likePhoto);
  nextButton.addEventListener("click", loadRandomImage);

  // Восстановление счетчика лайков и истории просмотров при загрузке страницы
  likeCount = parseInt(localStorage.getItem("likeCount")) || 0;
  imageHistory = JSON.parse(localStorage.getItem("imageHistory")) || [];
  updateLikeCount();
  displayImageHistory();
});

async function loadRandomImage() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=BQ-6JT7W10Wgjd6t-D2pjsQYX_ltPjXkPl7vrSjuGCs"
  );
  const data = await response.json();
  console.log(data);

  const imageElement = document.getElementById("image");
  const photographerElement = document.getElementById("photographer");

  imageElement.src = data.urls.regular;
  photographerElement.textContent = "Фотограф: " + data.user.name;

  // Сброс счетчика лайков при загрузке нового изображения
  likeCount = 0;
  updateLikeCount();

  // Добавление текущего объекта изображения в историю
  addToImageHistory({
    imageUrl: data.urls.regular,
    likeCount: 0,
  });
}

function likePhoto() {
  likeCount++;
  updateLikeCount();

  // Обновление лайков для текущей записи в истории
  if (imageHistory.length > 0) {
    imageHistory[imageHistory.length - 1].likeCount = likeCount;
    updateImageHistoryInLocalStorage();
  }
}

function updateLikeCount() {
  const likeCountElement = document.getElementById("likeCount");
  likeCountElement.textContent = "Лайков: " + likeCount;

  // Сохранение счетчика лайков в локальное хранилище
  localStorage.setItem("likeCount", likeCount.toString());
}

function addToImageHistory(imageData) {
  // Добавление текущего объекта изображения в историю просмотров
  imageHistory.push(imageData);

  // Ограничение истории до 10 последних просмотренных изображений
  if (imageHistory.length > 10) {
    imageHistory.shift();
  }

  // Сохранение истории просмотров в локальное хранилище
  updateImageHistoryInLocalStorage();

  // Обновление отображения истории на странице
  displayImageHistory();
}

function updateImageHistoryInLocalStorage() {
  // Сохранение истории просмотров в локальное хранилище
  localStorage.setItem("imageHistory", JSON.stringify(imageHistory));
}

function displayImageHistory() {
  // Отображение кликабельных ссылок на фотографии в истории
  const imageHistoryElement = document.getElementById("imageHistory");
  imageHistoryElement.innerHTML = ""; // Очистим содержимое элемента

  imageHistory.forEach((imageData, index) => {
    const link = document.createElement("a");
    link.href = "#"; // Пустая ссылка, так как мы будем использовать JavaScript для обработки клика
    link.textContent = `Фото ${index + 1} (${imageData.likeCount})`;

    link.addEventListener("click", () => {
      displayImageFromHistory(imageData);
    });

    const separator = document.createTextNode(", ");

    imageHistoryElement.appendChild(link);
    imageHistoryElement.appendChild(separator);
  });
}

function displayImageFromHistory(imageData) {
  // Отображение изображения из истории
  const imageElement = document.getElementById("image");
  const photographerElement = document.getElementById("photographer");

  imageElement.src = imageData.imageUrl;
  photographerElement.textContent = ""; // Сбрасываем информацию о фотографе

  // Обновление счетчика лайков
  likeCount = imageData.likeCount;
  updateLikeCount();
}
