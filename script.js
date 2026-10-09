const API_URL = 'http://localhost:3001/products';

// Счётчик товаров в корзине
let cartCount = 0;
const cartCountEl = document.getElementById('cart-count');

// Получаем товары с json-server и строим карточки
async function loadProducts() {
  const catalog = document.querySelector('.catalog');

  try {
    const response = await fetch(API_URL);
    // fetch не считает ошибкой ответы 404/500 — проверяем статус сами
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    // json-server не запущен или ответил ошибкой — показываем сообщение вместо белого экрана
    console.error('Не удалось загрузить товары:', error);
    const message = document.createElement('p');
    message.className = 'error';
    message.textContent = 'Не удалось загрузить товары. Запущен ли json-server на порту 3001?';
    catalog.appendChild(message);
  }
}

function renderProducts(products) {
  const catalog = document.querySelector('.catalog');

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} тг / ${product.unit}</p>
      <button>В корзину</button>
    `;

    // Обработчик вешаем сразу при создании карточки
    card.querySelector('button').addEventListener('click', () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
    });

    catalog.appendChild(card);
  });
}

loadProducts();
