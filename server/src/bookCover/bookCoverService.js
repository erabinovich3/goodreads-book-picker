const { response } = require("express");
const fetch = require("node-fetch");
const HTMLParser = require("node-html-parser");

const getGRCover = (id) => {
  return fetch(`https://www.goodreads.com/book/show/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching cover.");
      }

      return res.text();
    })
    .then((html) => {
      const doc = HTMLParser.parse(html);

      const imgSrcElem =
        doc.querySelector(`meta[name='twitter:image']`) ||
        doc.querySelector(`meta[property='og:image']`);
      const imgSrc = imgSrcElem.getAttribute("content").replace(/\._.*_/gm, "");

      return imgSrc;
    })
    .catch((err) => {
      console.error(err);
      return "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7";
    });
};

module.exports = { getGRCover };
