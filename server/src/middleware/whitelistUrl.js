const checkWhitelist = (req, res, next) => {
  const validDomains = ["https://goodreads-book-picker.netlify.app"];

  if (validDomains.includes(req.get("origin"))) {
    next();
  } else {
    console.error("Bad origin: " + req.get("origin"));
    res.status(400).json({ error: "Bad origin: " + req.get("origin") });
  }
};

module.exports = { checkWhitelist };
