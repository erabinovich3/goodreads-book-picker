const bookCoverService = require("./bookCoverService");

const getBookCoverById = (req, res) => {
  const { id } = req.params;

  bookCoverService
    .getGRCover(id)
    .then((imgSrc) => res.status(200).json({ bookCover: imgSrc }));
};

module.exports = { getBookCoverById };
