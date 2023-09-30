const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const web = require("./routes/web");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());
// cK37jQFmZ4hezuLy
mongoose
  .connect(
    "mongodb+srv://sujalgoyaltechies:cK37jQFmZ4hezuLy@cluster0.uoew9er.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/web", web);

const server = app.listen(5000, () => console.log(`Server started on 5000`));
