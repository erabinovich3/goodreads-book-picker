import React, { useEffect, useState } from "react";
import Loading from "./Loading";

function ChosenBook({ book }) {
  const [cover, setCover] = useState(book.cover);
  const defaultImg =
    "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7";

  const getCoverImg = () => {
    fetch(
      `https://goodreads-book-picker-server.herokuapp.com/api/v1/bookCovers/${book.grBookId}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("No cover found.");
        }

        return res.json();
      })
      .then((json) => {
        const imgSrc = json.bookCover;

        book.cover = imgSrc;
        setCover(imgSrc);
      })
      .catch((err) => {
        console.error(err);
        book.cover = defaultImg;
        setCover(defaultImg);
      });
  };

  useEffect(() => {
    if (!book.cover) {
      getCoverImg();
    }
  });

  if (book.cover) {
    const bookLink = `https://www.goodreads.com/book/show/${book.grBookId}`;
    return (
      <div className="card border-primary text-center w-75">
        <div className="row g-0">
          <div className="col-lg-4">
            <a href={bookLink} target="_blank" rel="noreferrer">
              <img
                className="card-img-top book-cover"
                src={cover}
                alt={book.title}
              />
            </a>
          </div>
          <div className="col-lg-8 d-flex flex-column justify-content-center align-items-center">
            <div className="card-body d-flex flex-column justify-content-center book-info">
              <h5 className="card-title">{book.title}</h5>
              <div className="card-subtitle text-muted">
                by {book.author}
                <br />
                {book.additionalAuthors && (
                  <div>and {book.additionalAuthors.toString()}</div>
                )}
              </div>
              <a href={bookLink} target="_blank" rel="noreferrer">
                View on Goodreads
              </a>
            </div>
            <div className="card-text align-self-end mb-2 me-2 book-etc">
              <small className="text-muted my-1">
                Shelf:&nbsp; <span className="shelf">{book.shelf}</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Loading />;
}

export default ChosenBook;
