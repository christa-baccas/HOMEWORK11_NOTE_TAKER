const express = require('express');
const path = require('path');
const api = require('./routes/index');
const db = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });


// returns all data in the term file
app.get('/api/notes', (req, res) => res.json(db)); 

app.get('/api/notes/:id', (req, res) => {   
  console.log(req)
  const requestedTerm = req.params.id; 

  for (let i = 0; i < db.length; i++) {               
    if (requestedTerm === db[i].id) {
      return res.json(db[i]);
    }
  }
});

app.listen(PORT, () =>
  console.log(`Listening to http://localhost:${PORT}`) 
);
