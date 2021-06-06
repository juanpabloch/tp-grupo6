require('dotenv').config();
const express = require('express');
const app = express();
const { errores } = require('./middleware');
const router = require('./routes');

//set port
const port = process.env.PORT || 3000;


//middlewares
app.use(express.json());
//routes
app.use(router);

app.use(errores);

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});