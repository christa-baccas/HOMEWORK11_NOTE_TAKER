const notes = require('express').Router();
const db = require('../db/db.json')

const { readFromFile, readAndAppend, removeFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
     title,
     text,
     id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error saving note');
  }
});


notes.delete("/api/notes/:id", function(req, res) {
    let id = req.params.id;

    for (i=0; i < db.length; i++){
        
        if (db[i].id === id){
            db.splice(i,1);
        }
    }
    writeToFile(db);
});

module.exports = notes;
