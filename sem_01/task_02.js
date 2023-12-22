// Повары и их специализации
const chefsSpecialties = new Map([
    ['Виктор', 'Пицца'],
    ['Ольга', 'Суши'],
    ['Дмитрий', 'Десерты']
  ]);
  
  // Блюда и их повара
  const dishesAndChefs = new Map([
    ['Пицца "Маргарита"', 'Виктор'],
    ['Пицца "Пепперони"', 'Виктор'],
    ['Суши "Филадельфия"', 'Ольга'],
    ['Суши "Калифорния"', 'Ольга'],
    ['Тирамису', 'Дмитрий'],
    ['Чизкейк', 'Дмитрий']
  ]);
  
  // Заказы каждого клиента
  const orders = new Map([
    [{ name: 'Алексей' }, ['Пицца "Пепперони"', 'Тирамису']],
    [{ name: 'Мария' }, ['Суши "Калифорния"', 'Пицца "Маргарита"']],
    [{ name: 'Ирина' }, ['Чизкейк']]
  ]);
  
  // Функция для получения блюд, заказанных каждым клиентом
  function getOrder(client) {
    return orders.get(client) || [];
  }
  
  // Функция для получения повара, готовящего определенное блюдо
  function getChef(dish) {
    return dishesAndChefs.get(dish);
  }
  
  // Вывод заказов клиентов
  orders.forEach((dishes, client) => {
    const orderedDishes = getOrder(client);
    const chefDishes = orderedDishes.map(dish => `${dish} (${getChef(dish)})`).join(', ');
    console.log(`${client.name} заказал: ${chefDishes}`);
  });
  