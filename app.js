require("dotenv").config(); //membaca file .env
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(require("./routes"));

//error handling
app.use((err, req, res, next) => {
  console.log(err);
  let error= err.name || "ServerError";
  const message = err.message || "Internal Server Error";
  const status = err.statusCode || 500;

  res.status(status).json({error,message})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})