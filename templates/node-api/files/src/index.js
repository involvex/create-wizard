import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Node API!');
});

app.listen(port, () => {
  console.log(`Node API listening at http://localhost:${port}`);
});