const initialData = [
    {
      product: "Apple iPhone 13",
      reviews: [
        {
          id: "1",
          text: "Отличный телефон! Батарея держится долго.",
        },
        {
          id: "2",
          text: "Камера супер, фото выглядят просто потрясающе.",
        },
      ],
    },
    {
      product: "Samsung Galaxy Z Fold 3",
      reviews: [
        {
          id: "3",
          text: "Интересный дизайн, но дорогой.",
        },
      ],
    },
    {
      product: "Sony PlayStation 5",
      reviews: [
        {
          id: "4",
          text: "Люблю играть на PS5, графика на высоте.",
        },
      ],
    },
  ];
  
  // Функция для добавления отзыва
  function addReview() {
    const productSelect = document.getElementById("productSelect");
    const selectedProduct = productSelect.value;
    const reviewText = document.getElementById("reviewText").value;
  
    try {
      if (reviewText.length < 50 || reviewText.length > 500) {
        throw "Длина отзыва должна быть от 50 до 500 символов";
      }
  
      const product = initialData.find((item) => item.product === selectedProduct);
  
      if (product) {
        const newReview = {
          id: (product.reviews.length + 1).toString(),
          text: reviewText,
        };
  
        product.reviews.push(newReview);
        displayReviews(selectedProduct);
      } else {
        throw "Товар не найден!";
      }
    } catch (error) {
      alert(error);
    }
  }
  
  // Функция для отображения отзывов
  function displayReviews(productName) {
    const reviewsContainer = document.getElementById("reviewsContainer");
    reviewsContainer.innerHTML = "";
  
    const product = initialData.find((item) => item.product === productName);
  
    if (product) {
      product.reviews.forEach((review) => {
        const reviewElement = document.createElement("div");
        reviewElement.textContent = review.text;
        reviewsContainer.appendChild(reviewElement);
      });
    }
  }
  
  // Функция для обновления счетчика символов
  function updateCharCount() {
    const reviewText = document.getElementById("reviewText").value;
    const charCountElement = document.getElementById("charCount");
    charCountElement.textContent = `Символов: ${reviewText.length}`;
  }
  
  window.onload = function () {
    const productSelect = document.getElementById("productSelect");
    productSelect.addEventListener("change", () => {
      displayReviews(productSelect.value);
    });
  
    const reviewTextarea = document.getElementById("reviewText");
    reviewTextarea.addEventListener("input", updateCharCount);
  
    displayReviews(initialData[0].product);
    updateCharCount();
  };
  