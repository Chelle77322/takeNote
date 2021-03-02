
 const fs = require("fs");
 
 //Start of API Routing for app
 module.exports = (app) => {
     
   let noteStore = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
     app.get('/api/notes', function (request, result) {
         
         return result.json(noteStore);
         
     });
 //POST 
 app.post('/api/notes', (request, result) => {
     let idNote;
     if (noteStore.length){
         idNote = Math.max(...(noteStore.map(note => note.iD)));
      
     }else{
         idNote = 0;
         }
     
     const iD = idNote + 1;
     console.log(iD);
 //Adds note to array and removes last index
 noteStore.push({iD, ...request.body });
 result.json(noteStore.slice(-1));
 });
 //DELETE?
 app.delete('/api/notes/:iD', (request, result)=>{
     let grabNote = noteStore.find(({iD})=> iD === JSON.parse(request.params.iD));//Not finding array ??
    
 
 
 noteStore.splice(noteStore.indexOf(grabNote), 1);
 result.end("Selected Note was deleted");
 });
 
 };