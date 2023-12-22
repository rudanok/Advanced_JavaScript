// Создаем символ для итератора
const albumIterator = Symbol.iterator;

// Создаем объект музыкальной коллекции
const musicCollection = {
  albums: [
    {
      title: "Альбом 1",
      artist: "Исполнитель 1",
      year: "2000"
    },
    {
      title: "Альбом 2",
      artist: "Исполнитель 2",
      year: "2005"
    },
    {
      title: "Альбом 3",
      artist: "Исполнитель 3",
      year: "2010"
    }
  ],
  // Реализуем кастомный итератор
  [albumIterator]: function() {
    let index = 0;
    const albums = this.albums;
    return {
      next: function() {
        return index < albums.length ?
          { value: albums[index++], done: false } :
          { done: true };
      }
    };
  }
};

// Используем цикл for...of для перебора альбомов и вывода на консоль
for (const album of musicCollection) {
  console.log(`${album.title} - ${album.artist} (${album.year})`);
}
