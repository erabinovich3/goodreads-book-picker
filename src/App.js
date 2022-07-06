import { useState } from "react";
import ChosenBook from "./components/ChosenBook";
import GRDataUpload from "./components/GRDataUpload";
import Loading from "./components/Loading";
import Sidebar from "./components/Sidebar";
import { getRandomBook, getRandomBookFromShelves } from "./data/book";
import { getShelves } from "./data/file";

import "../src/css/App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [chosenBook, setChosenBook] = useState(null);
  const [selectedShelves, setSelectedShelves] = useState([]);

  const getNewBook = () => {
    if (selectedShelves.length) {
      setChosenBook(getRandomBookFromShelves(books, selectedShelves));
    } else {
      setChosenBook(getRandomBook(books));
    }
  };

  if (isLoading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    );
  }

  if (!books.length && localStorage.getItem("books")) {
    console.log("Getting books from local storage");
    setBooks(JSON.parse(localStorage.getItem("books")));
  }

  if (!books.length) {
    return <GRDataUpload setLoading={setIsLoading} setBooks={setBooks} />;
  }

  return (
    <div className="container-fluid h-100 app book-pick-page">
      <div className="row h-100">
        <Sidebar
          shelves={getShelves(books)}
          setSelectedShelves={setSelectedShelves}
          setBooks={setBooks}
          setChosenBook={setChosenBook}
        />
        <div className="book-content pb-4 col-sm-8">
          <div className="text-center mt-md-5 get-book-btn">
            <button className="btn btn-primary" onClick={getNewBook}>
              Get Random Book
            </button>
          </div>
          <div className="d-flex justify-content-center py-4 position-relative start-50 translate-middle chosen-book">
            {chosenBook ? (
              <ChosenBook book={chosenBook} />
            ) : (
              <div className="spacer"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
