var express = require('express');
var app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

app.use(require('./routes/get'))
app.use(require('./routes/put'))
app.use(require('./routes/post'))


// app.post('/hola', function (req, res) {
//   res.send('[POST]Saludos desde express');
// });

// app.get('/', function (req, res) {
//   res.json(db);
// });

module.exports = app;


