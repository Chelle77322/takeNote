$(document).ready(function(){
var $Title = $(".note-title");
var $text = $(".note-text-area");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteStore = $(".list-container . list-group");

// activeNote is used to keep track of the note in the textarea
var activeNotes = {};

const getNotes = () =>
  fetch('api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide($saveNoteBtn);

  if (activeNotes.id) {
    $Title.setAttribute('readonly', true);
    $text.setAttribute('readonly', true);
    $text.value = activeNote.title;
    $text.value = activeNote.text;
  } else {
    $Title.value = '';
    $text.value = '';
  }
};

const handleNoteSave = () => {
  const addNote = {
    title: $Title.value,
    text: $text.value,
  };
  saveNote(addNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  var note = $(this)
  .parent(".list-group-item")
  .data();

  if (activeNotes.id === noteId) {
    activeNotes = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = (e) => {
  e.preventDefault();
  activeNotes = {};
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!$Title.value.trim() || !$text.value.trim()) {
    hide($saveNoteBtn);
  } else {
    show($saveNoteBtn);
  }
};

// Render the list of note titles
var renderNoteList = async (notes) => {
  $noteStore.empty();
  var noteStoreItems = [];
  for (var j = 0; j <notes.length; j++){
    var notes = notes[j];
    var $li = $("<li class = 'list-group-item'>").data(notes);
    var $span = $("<span>").text(notes.title);
    var $del = $("<i class = 'fas fa-trash-alt float-right text-danger delete-note'>");

    $li.append($span, $del);
    noteStoreItems.push($li);
  };
  var getAndRenderNotes = async (e) =>{
    return getNotes().then(function(data){renderNoteList(data);
    });
  };
  $saveNoteBtn.click(handleNoteSave);
  $noteStore.click(".list-group-item", handleNoteView);
  $newNoteBtn.click(handleNewNoteView);
  $noteStore.click(".delete-note", handleNoteDelete);
  $Title.keyup(handleRenderSaveBtn);
  $text.keyup(handleRenderSaveBtn);

  getAndRenderNotes();
}   
  
});
