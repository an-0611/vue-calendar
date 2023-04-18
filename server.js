const express = require("express");
const app = express();

const mockData = require("./src/services/mockData.json");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// GET /categories
app.get("/categories", (req, res) => {
  const data = mockData.categories;
  res.json(data);
});

// GET /items
app.get("/items", (req, res) => {
  const data = mockData.items;
  res.json(data);
});

// GET /items/:id
app.get("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const data = mockData.items.data.find((el) => el.id === itemId);
  res.json(data);
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
