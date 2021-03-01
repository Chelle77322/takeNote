//Start of the code and declaring all the variables required to make this app work

var $Title = $(".note-title");
var $textNote = $(".note-textarea");
var $noteSave = $(".save-note");
var $noteAdd = $(".new-note");
var $noteStore = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var loadingNotes = ()=> {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
var saveNote = (note) =>{
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
var deleteNote = (iD)=>{
  return $.ajax({
    url: "api/notes/" + iD,
    method: "DELETE"
  });
};

// Displays active note, otherwise will just show "blank"
var renderActiveNote =()=> {
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
var handleNoteSave =()=> {
  var addNote = {
    title: $Title.val(),
    text: $textNote.val()
  };

  saveNote(addNote).then( (data)=> {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = (e) =>{
 
  e.stopPropagation();

  var note = $(this)
  
    .parent(".list-group-item")
    .data();

  if (activeNote.iD == note.idNote) {
    activeNote = {};
    console.log(note.idNote);
    
  }

  deleteNote(note.iD).then(() =>{
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = ()=> {
  activeNote = $(this).data();
  renderActiveNote();
 
};

var handleAddNoteView =()=> {
  activeNote = {};
  renderActiveNote();
};

var handleRenderSaveBtn =() => {
  if (!$Title.val().trim() || !$textNote.val().trim()) {
    $noteSave.hide();
  } else {
    $noteSave.show();
  }
};

// Render's the list of note titles
var renderNoteStore = (notes) => {
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

// Gets notes from the db and renders them to the slastNoteebar
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