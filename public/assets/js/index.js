//Start of the code and declaring all the variables required to make this app work

var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
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
var deleteNote = (lastNote)=>{
  return $.ajax({
    url: "api/notes/" + lastNote,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function () {
  $noteSave.hide();

  if (activeNote.lastNote) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function () {
  var addNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(addNote).then(function (data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function (event) {
  // prevents the click listener for the list from being called when the button inslastNotee of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.lastNote === note.lastNote) {
    activeNote = {};
  }

  deleteNote(note.lastNote).then(function () {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
  console.log(this);
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleaddNoteView =()=> {
  activeNote = $(this).data();
  renderActiveNote();
};


var handleRenderSaveBtn =() => {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $noteSave.hide();
  } else {
    $noteSave.show();
  }
};

// Render's the list of note titles
var renderNoteStore = function (notes) {
  $noteStore.empty();

  var noteStoreItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

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
  return loadingNotes().then(function (data) {
    renderNoteStore(data);
  });
};

$noteSave.click(handleNoteSave);
$noteStore.click( ".list-group-item", handleNoteView);
$noteAdd.click(handleaddNoteView);
$noteStore.click(".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);



// Gets and renders the initial list of notes
getAndRenderNotes();