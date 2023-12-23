class Library {
    #books;
  
    constructor(initialBooks = []) {
      const uniqueBooks = new Set(initialBooks);
      if (uniqueBooks.size !== initialBooks.length) {
        throw new Error('Начальный список книг содержит дубликаты!');
      }
      this.#books = [...initialBooks];
    }
  
    get allBooks() {
      return this.#books;
    }
  
    addBook(title) {
      if (this.#books.includes(title)) {
        throw new Error('Эта книга уже есть в библиотеке!');
      }
      this.#books.push(title);
    }
  
    removeBook(title) {
      const index = this.#books.indexOf(title);
      if (index === -1) {
        throw new Error('Этой книги нет в библиотеке!');
      }
      this.#books.splice(index, 1);
    }
  
    hasBook(title) {
      return this.#books.includes(title);
    }
  }

// ПРОВЕРЯЕМ

// Создаем новый экземпляр библиотеки с начальным списком книг
const library = new Library(['Книга 1', 'Книга 2', 'Книга 3']);

// Получаем список всех книг
console.log(library.allBooks); // ["Книга 1", "Книга 2", "Книга 3"]

// Добавляем новую книгу
library.addBook('Книга 4');
console.log(library.allBooks); // ["Книга 1", "Книга 2", "Книга 3", "Книга 4"]

// Пытаемся добавить книгу с уже существующим названием
try {
  library.addBook('Книга 2');
} catch (error) {
  console.log(error.message); // "Эта книга уже есть в библиотеке!"
}

// Проверяем наличие книги
console.log(library.hasBook('Книга 3')); // true
console.log(library.hasBook('Книга 5')); // false

// Удаляем книгу
library.removeBook('Книга 1');
console.log(library.allBooks); // ["Книга 2", "Книга 3", "Книга 4"]

// Пытаемся удалить несуществующую книгу
try {
  library.removeBook('Книга 5');
} catch (error) {
  console.log(error.message); // "Этой книги нет в библиотеке!"
}
