const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

// upload enpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'no file uploaded' });
  }

  const file = req.files.file;

  file.mv(`./client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `uploads/${file.name}` });
  });
});

const port = 5000;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server listening on port ${port}`));
