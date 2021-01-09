const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
const path = require("path");
require("dotenv").config();

// app
const app = express();

const DB =
  process.env.MONGODB_URI ||
  process.env.DATABASE ||
  "mongodb+srv://sam:asmara@cluster0.yba8p.mongodb.net/mekele?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

const apath = path.resolve(__dirname, "../frontend/my-app/build");
console.log(apath);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(apath));
}
app.get("/bye", (req, res) => {
  console.log("lol bye");
  res.send("BYE BYE BYE BYE");
});

// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
console.log(readdirSync("./routes"));
// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running good on port ${port}`));
