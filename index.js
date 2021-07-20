const express = require("express");
const app = express();
const { errores, validar } = require("./middleware");
const router = require("./routes");

//set port
const port = process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(router);
app.use(errores.is404);
app.use(errores.handler);

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});