export const getRandomBook = (books) => {
  const bookIndex = Math.floor(Math.random() * books.length);
  return books[bookIndex];
};

export const getRandomBookFromShelves = (books, shelves) => {
  const booksShelved = books.filter((book) => shelves.includes(book.shelf));
  const bookIndex = Math.floor(Math.random() * booksShelved.length);
  return booksShelved[bookIndex];
};
