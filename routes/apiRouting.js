const { request, json } = require("express");
const dbJSON = require('../db/db.json');
const fs = require("fs");
//Start of API Routing for app
module.exports = (app =>{
    
  let noteStore = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    app.get('/api/notes', function (request, result) {
        
        return result.json(noteStore);
        
    });
//POST 
app.post('/api/notes', (request, result)=>{
    let lastNote;
    if (noteStore.length){
        lastNote = Math.max(...(noteStore.map(note => note.lastNote)));
     
    }else{
        lastNote = 0;
        
    }
    const note = lastNote +1;
//Adds note to array and removes last index
noteStore.push({note, ...request.body});
result.json(noteStore.slice(-1));
});
//DELETE?
app.delete('/api/notes/:note', (request, result)=>{
    let grabNote = noteStore.find(({note})=> note === JSON.parse(request.params.lastNote));
//Confirms match to delete

noteStore.splice(noteStore.indexOf(grabNote), 1);
result.end("Selected Note was deleted");
});

});