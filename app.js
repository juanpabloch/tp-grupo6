const express = require('express');
const app = express();
const { errores , validar } = require('./middleware');
const router = require('./routes');

//set port
const port = process.env.PORT || 3000;


//middlewares
app.use(express.json());
app.use(router);
app.use(errores.is404);
app.use(errores.is500);

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});