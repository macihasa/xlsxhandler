const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fileUpload = require('express-fileupload');
const xlformat = require('./services/xlformat');
const app = express();
const port = process.env.PORT || 5000;

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

  await file.mv(`./client/build/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    const summary = xlformat(file);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    return res.send(summary);
  });
});

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    );
  });
} else {
  app.get('/', (req, res) => {
    res.send('Please set to production');
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}`));
