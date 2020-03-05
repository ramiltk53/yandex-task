const express = require("express")

// Route files
const cardsRouter = require("./routes/cards")
const usersRouter = require("./routes/users")

const app = express();

// Mount routers
app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

app.use(express.static("public"));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

const PORT = require("./config/index").PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`unhandledRejection. Error: ${err}`)
  server.close(() => process.exit(1));
});
