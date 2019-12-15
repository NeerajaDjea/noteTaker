var notesData = require("../db/db.json");
const uuidv1 = require('uuid/v1');
const fs = require("fs");

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {

        var list = [];
        for (var key in notesData) {
            list.push(notesData[key]);
        }

        console.log(list);
        res.json(list);
    });

    app.post("/api/notes", function(req, res) {
        //add id to note 
        var tempId = uuidv1();
        newNote = {
            text: req.body.text,
            title: req.body.title,
            id: tempId
        }

        notesData[tempId] = newNote;

        console.log(notesData);
        fs.writeFile("./db/db.json", JSON.stringify(notesData), (error) => {
            console.log("Couldn't update the file.")
        });

        res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req, res) {
        const noteId = req.params.id;
        console.log(noteId);

        delete notesData[noteId];
        console.log(notesData);

        fs.writeFile("./db/db.json", JSON.stringify(notesData), (error) => {
            console.log("Couldn't update the file.")
        });

        var response = {
            status: 200,
            success: 'Updated Successfully'
        }

        res.end(JSON.stringify(response));

    });


}