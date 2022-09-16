const express = require('express');
const fileUpload = require('express-fileupload');
const xlformat = require('./services/xlformat');
const app = express();
const port = 5000;

app.use(fileUpload());

// Allows usage of text + json in request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// upload enpoint
app.post('/upload', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'no file uploaded' });
  }

  const file = req.files.file;

  await file.mv(`./client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  const summary = await xlformat(file);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  return res.send(summary);
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server listening on port ${port}`));
