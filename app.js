require('dotenv').config();
const express = require('express');
const app = express();

const router = require('./routes');

//set port
const port = process.env.PORT || 3000;


//middlewares
app.use(express.json());

//routes
app.use(router);


app.use((err, req, res, next)=>{
  if(err){
      res.status(err.status || 500).json({
        mensaje: 'Error inesperado'
      })
  }
})

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});