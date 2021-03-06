const express = require('express');
const app = express();

const port = 3000;

app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log('Running on', port);
});
