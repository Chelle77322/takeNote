//Start of the code and declaring all the variables required to make this app work

var $Title = $(".note-title");
var $textNote = $(".note-textarea");
var $noteSave = $(".save-note");
var $noteAdd = $(".new-note");
var $noteStore = $(".list-container .list-group");

// is the note that is currently active
var activeNote = {};
console.log(activeNote);

// A function for getting all notes from the db
var loadingNotes = function (){
  return $.ajax({
    url: "/api/notes",
    method: "GET",
    success: function(result){
      console.log(result);
    }
  });
};

// A function for saving a note to the db
var saveNote =  function (note) {
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
var deleteNote = function (iD ){
  return $.ajax({
    url: "api/notes/" + iD,
    method: "DELETE",
    success: function (iD){
console.log(iD);
    }
  });
};

// Displays active note, otherwise will just show "blank"-not working
var renderActiveNote = function () {
  $noteSave.hide();

  if (activeNote.iD) {
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
var handleNoteSave = function () {
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
   
//CODE BREAKS HERE
 //if (activeNote.iD === note.iD) {
   // activeNote ={};
  //}

  deleteNote(activeNote.iD).then(function(){//also errors out here
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
  return loadingNotes().then(function (data) {
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