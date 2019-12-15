var notesData = require("../db/db.json");
const uuidv1 = require('uuid/v1');
const fs = require("fs");

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    app.post("/api/notes", function(req, res) {
        //add id to note 
        newNote = {
            text: req.body.text,
            title: req.body.title,
            id: uuidv1()
        }
        notesData.push(newNote);
        res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req, res) {
        const noteId = req.params.id;
        console.log(noteId);

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const notesFile = JSON.parse(data);

            const updatedNotes = notesFile.filter(note => note.id !== noteId);
            const json = JSON.stringify(updatedNotes);
            console.log(updatedNotes);

        });
    });


}