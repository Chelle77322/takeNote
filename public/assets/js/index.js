//Start of the code and declaring all the variables required to make this app work

var $Title = $(".note-title");
var $textNote = $(".note-textarea");
var $noteSave = $(".save-note");
var $noteAdd = $(".new-note");
var $noteStore = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var loadingNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
    success: function(result){
      console.log(result);
    }
  });
};

// A function for saving a note to the db
var saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
    success: function(result){
      console.log(result);
    }
  });
};

// A function for deleting a note from the db
var deleteNote = (iD) =>{
  return $.ajax({
    url: "api/notes/" + iD,
    method: "DELETE",
    success: function (iD){
console.log(iD);
    }
  });
};

// Displays active note, otherwise will just show "blank"
var renderActiveNote = () => {
  $noteSave.hide();

  if (activeNote.iD) {
    console.log(activeNote.ID);
    $Title.attr("readonly", true);
    $textNote.attr("readonly", true);
    $Title.val(activeNote.title);
    $textNote.val(activeNote.text);
  } else {
    $Title.attr("readonly", false);
    $textNote.attr("readonly", false);
    $Title.val("");
    $textNote.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = () => {
  var addNote = {
    title: $Title.val(),
    text: $textNote.val()
  };

  saveNote(addNote).then( function (data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function (e){
 
  e.stopPropagation();

 var note = $(this)
 
  
    .parent(".list-group-item")
    .data();
   

  if (activeNote.iD === note.iD) {
    activeNote = {};
    console.log(activeNote={});
    
  
    
  }

  deleteNote(note.iD).then(function(){
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function (){
  activeNote = $(this).data();
  renderActiveNote();
 
};

var handleAddNoteView = function(){
  activeNote = {};
  renderActiveNote();
};

var handleRenderSaveBtn = function(){
  if (!$Title.val().trim() || !$textNote.val().trim()) {
    $noteSave.hide();
  } else {
    $noteSave.show();
  }
};

// Render's the list of note titles
var renderNoteStore = function(notes) {
  $noteStore.empty();

  var noteStoreItems = [];

  for (var j = 0; j < notes.length; j++) {
    var note = notes[j];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteStoreItems.push($li);
  }

  $noteStore.append(noteStoreItems);
};

// Gets notes from the db and populates the list container section of HTML
var getAndRenderNotes = ()=> {
  return loadingNotes().then((data)=> {
    renderNoteStore(data);
  });
};

$noteSave.click(handleNoteSave);
$noteStore.click(".list-group-item", handleNoteView);
$noteAdd.click(handleAddNoteView);
$noteStore.click(".delete-note", handleNoteDelete);
$Title.on("keyup", handleRenderSaveBtn);
$textNote.on("keyup", handleRenderSaveBtn);
// Gets and renders the initial list of notes
getAndRenderNotes();