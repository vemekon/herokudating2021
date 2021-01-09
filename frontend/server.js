// Import npm packages
const express = require("express");
const mongoose = require("mongoose");

const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

//const routes = require("./routes/api");

// Step 2
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://sam:asmara@cluster0.yba8p.mongodb.net/mekele?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("my-app/build"));
}

// HTTP request logger
// app.use(morgan("tiny"));
// app.use("/api", routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
