const filterBooks = (books) => {
  const filteredBooks = books
    // filter out already read/currently reading books
    .filter(
      (book) =>
        book["exclusive-shelf"] !== "read" &&
        book["exclusive-shelf"] !== "currently-reading"
    )
    .map((book) => {
      return {
        grBookId: book["book-id"],
        title: book.title,
        author: book.author,
        cover: null,
        additionalAuthors: book["additional-authors"],
        shelf: book["exclusive-shelf"],
        isbn: book.isbn === '=""' ? "" : book.isbn.substring(2, 12),
        isbn13: book.isbn13 === '=""' ? "" : book.isbn13.substring(2, 15),
      };
    });

  return filteredBooks;
};

const isValidGRArray = (arr) => {
  return (
    arr[0].hasOwnProperty("book-id") &&
    arr[0].hasOwnProperty("title") &&
    arr[0].hasOwnProperty("author") &&
    arr[0].hasOwnProperty("author-l-f") &&
    arr[0].hasOwnProperty("additional-authors") &&
    arr[0].hasOwnProperty("isbn") &&
    arr[0].hasOwnProperty("isbn13") &&
    arr[0].hasOwnProperty("my-rating") &&
    arr[0].hasOwnProperty("average-rating") &&
    arr[0].hasOwnProperty("publisher") &&
    arr[0].hasOwnProperty("binding") &&
    arr[0].hasOwnProperty("number-of-pages") &&
    arr[0].hasOwnProperty("year-published") &&
    arr[0].hasOwnProperty("original-publication-year") &&
    arr[0].hasOwnProperty("date-read") &&
    arr[0].hasOwnProperty("date-added") &&
    arr[0].hasOwnProperty("bookshelves") &&
    arr[0].hasOwnProperty("bookshelves-with-positions") &&
    arr[0].hasOwnProperty("exclusive-shelf") &&
    arr[0].hasOwnProperty("my-review") &&
    arr[0].hasOwnProperty("spoiler") &&
    arr[0].hasOwnProperty("private-notes") &&
    arr[0].hasOwnProperty("read-count") &&
    arr[0].hasOwnProperty("recommended-for") &&
    arr[0].hasOwnProperty("recommended-by") &&
    arr[0].hasOwnProperty("owned-copies") &&
    arr[0].hasOwnProperty("original-purchase-date") &&
    arr[0].hasOwnProperty("original-purchase-location") &&
    arr[0].hasOwnProperty("condition") &&
    arr[0].hasOwnProperty("condition-description") &&
    arr[0].hasOwnProperty("bcid")
  );
};

const getShelves = (books) => {
  return [...new Set(books.map((book) => book.shelf))];
};

module.exports = {
  isValidGRArray,
  filterBooks,
  getShelves,
};
