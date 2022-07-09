const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const bookCoverRouter = require("./src/bookCover/bookCoverRoutes");

app.use(express.json());
app.use(cors());

// custom middleware
const { checkWhitelist } = require("./src/middleware/whitelistUrl");
app.use(checkWhitelist);

app.use("/api/v1/bookCovers", bookCoverRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
