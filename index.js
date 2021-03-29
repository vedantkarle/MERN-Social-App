const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/error");
const app = express();

const { MONGODB } = require("./config");

app.use(express.json());
app.use(cors());

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/posts", postRoutes);
app.use("/", userRoutes);

app.use(notFound);

//Global Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 8000;

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(port))
  .then(() => console.log("Server Started"));
