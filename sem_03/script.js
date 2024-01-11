document.addEventListener("DOMContentLoaded", function () {
    loadReviews();
});

function addReview() {
    const productName = document.getElementById("product-name").value;
    const reviewText = document.getElementById("review-text").value;

    if (productName && reviewText) {
        const review = {
            product: productName,
            text: reviewText,
        };

        // Получаем текущие отзывы из LocalStorage
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        // Добавляем новый отзыв
        reviews.push(review);

        // Сохраняем обновленные отзывы в LocalStorage
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Очищаем поля ввода
        document.getElementById("product-name").value = "";
        document.getElementById("review-text").value = "";

        // Перезагружаем список отзывов
        loadReviews();
    } else {
        alert("Введите название продукта и текст отзыва!");
    }
}

function loadReviews() {
    const productList = document.getElementById("product-list");
    const reviewsContainer = document.getElementById("reviews-container");

    // Очищаем предыдущие данные
    productList.innerHTML = "";
    reviewsContainer.innerHTML = "";

    // Получаем текущие отзывы из LocalStorage
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // Заполняем список продуктов
    reviews.forEach((review, index) => {
        const listItem = document.createElement("li");
        listItem.className = "product-item";
        listItem.textContent = review.product;
        listItem.addEventListener("click", () => showReviews(review.product, index));
        productList.appendChild(listItem);
    });
}

function showReviews(productName, index) {
    const reviewsContainer = document.getElementById("reviews-container");

    // Получаем текущие отзывы из LocalStorage
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // Очищаем предыдущие данные
    reviewsContainer.innerHTML = "";

    // Заголовок с названием продукта
    const title = document.createElement("h3");
    title.textContent = `Отзывы о продукте: ${productName}`;
    reviewsContainer.appendChild(title);

    // Отзывы по выбранному продукту
    reviews.forEach((review, i) => {
        if (review.product === productName) {
            const reviewDiv = document.createElement("div");
            reviewDiv.innerHTML = `<p>${review.text}</p><button onclick="deleteReview(${i})">Удалить</button>`;
            reviewsContainer.appendChild(reviewDiv);
        }
    });
}

function deleteReview(index) {
    // Получаем текущие отзывы из LocalStorage
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // Удаляем отзыв по индексу
    reviews.splice(index, 1);

    // Сохраняем обновленные отзывы в LocalStorage
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Перезагружаем список отзывов
    loadReviews();
}
