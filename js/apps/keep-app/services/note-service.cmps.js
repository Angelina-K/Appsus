import { utilService } from "../../../services/util-service.js";
import { storageService } from "../../../services/async-storage-service.js";

export const noteService = {
  query,
  getById,
  deleteNote,
  changeBcgColor,
  changeTxtColor,
  tooglePin,
};

const NOTE_KEY = "note";
var gNotes = _createNotes();
// console.log("notes", gNots);

function query() {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (!notes || !notes.length) {
      storageService.postMany(NOTE_KEY, gNotes);
      return gNotes;
    }
    // console.log("notes", notes);
    return notes;
  });
}

function deleteNote(notesId) {
  return storageService.remove(NOTE_KEY, notesId);
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function changeBcgColor(bcgColor, noteId) {
  noteId.then((note) => {
    note.style.bcgColor = bcgColor;
    utilService.saveToStorage(NOTE_KEY, gNotes);
  });
}

function changeTxtColor(txtColor, noteId) {
  noteId.then((note) => {
    note.style.txtColor = txtColor;
    utilService.saveToStorage(NOTE_KEY, gNotes);
  });
}

function tooglePin(noteId) {
  getById(noteId).then((note) => {
    console.log(noteId);
    note.isPinned = !note.isPinned;
    utilService.saveToStorage(NOTE_KEY, gNotes);
    console.log(gNotes);
  });
}

function getById(notsId) {
  return storageService.get(NOTE_KEY, notsId);
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [
      _createNote(
        "note-txt",
        { titleTxt: "My first note", bodyTxt: "I want to sleep 😴😴😴" },
        "#444247"
      ),
      _createNote(
        "note-map",
        { titleTxt: "Home Sweet Home", location: "Tel Aviv" },
        "#68936e"
      ),
      _createNote(
        "note-img",
        {
          titleTxt: "My favorite movie",
          url: "https://excursionsbarcelona.com/wp-content/uploads/2021/01/Harry-Potter-in-Barcelona.jpg",
        },
        "#e77254"
      ),
      _createNote(
        "note-video",
        {
          titleTxt: "I'll be there for you - acoustic",
          url: "https://www.youtube.com/embed/1wv-jEJMbCA",
        },
        "#68936e"
      ),
      _createNote(
        "note-todos",
        {
          titleTxt: "Stuff to todo today",
          todos: [
            { todo: "learn Javascript", isDone: false },
            { todo: "do some css changes in my app", isDone: false },
            { todo: "learn vue a", isDone: false },
          ],
        },
        "#ca9e5b"
      ),
      _createNote(
        "note-txt",
        {
          titleTxt: "Door code to the building",
          bodyTxt: "3003# and push hard on the door",
        },
        "#e77254"
      ),
      _createNote(
        "note-img",
        {
          titleTxt: "When im sad",
          url: "https://ichef.bbci.co.uk/news/976/cpsprodpb/140B3/production/_111699028_gettyimages-1168451046.jpg",
        },
        "#ca9e5b"
      ),
      _createNote(
        "note-video",
        {
          titleTxt: "Music for a better mood",
          url: "https://www.youtube.com/embed/NiOxSuEJaTI",
        },
        "#444247"
      ),
      _createNote(
        "note-todos",
        {
          titleTxt: "Things to prepare for the family reunion",
          todos: [
            { todo: "Chocolate cookies", isDone: false },
            { todo: "Cheesecake", isDone: false },
            { todo: "Bread", isDone: false },
          ],
        },
        "#68936e"
      ),
    ];
    utilService.saveToStorage(NOTE_KEY, notes);
  }
  // console.log(notes[0].info);
  // console.log(notes[1].info);
  return notes;
}

function _createNote(type, info, bcgColor = "rgb(68, 66, 71)") {
  return {
    id: utilService.makeId(),
    type: type,
    isPinned: false,
    isMarked: false,
    isOpen: false,
    createdTime: Date.now(),
    style: {
      txtColor: "#f5f5f5",
      bcgColor,
    },
    info: info,
  };
}
