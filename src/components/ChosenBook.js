import React, { useEffect, useState } from "react";
import Loading from "./Loading";

function ChosenBook({ book }) {
  const [cover, setCover] = useState(book.cover);

  const getCoverImg = () => {
    fetch(
      `https://goodreads-book-picker.netlify.app/gr-book-cover/${book.grBookId}`
    )
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const imgSrcElem =
          doc.querySelector(`meta[name='twitter:image']`) ||
          doc.querySelector(`meta[property='og:image']`);
        const imgSrc = imgSrcElem
          .getAttribute("content")
          .replace(/\._.*_/gm, "");

        book.cover = imgSrc;
        setCover(imgSrc);
      })
      .catch((err) => {
        console.error(err);
        setCover(require("../images/fang-wei-lin-H1IRUS1vEFA-unsplash.jpg"));
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
