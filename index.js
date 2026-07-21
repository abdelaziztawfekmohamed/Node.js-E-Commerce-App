const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const i18next = require("i18next");
const i18nextFsBackend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const cors = require("cors");
const morgan = require("morgan");
const categoryRouter = require("./routes/category.route");

i18next
  .use(i18nextFsBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}.json",
    },
  });

const app = express();
const port = process.env.PORT;
const api = process.env.API;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"],
  }),
);

app.use(i18nextMiddleware.handle(i18next));
app.use(express.json());
app.use(morgan("tiny"));

app.use(`${api}/categories`, categoryRouter);
app.get(`${api}/test`, (req, res) => {
  res.send(req.t("validationFailed"));
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB ^-^");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
