import { utilService } from "../../../services/util-service.js";
import { storageService } from "../../../services/async-storage-service.js";

export const noteService = {
  query,
  getById,
  deleteNote,
  changeBcgColor,
  changeTxtColor,
  changeInfo,
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

function deleteNote(notsId) {
  return storageService.remove(NOTE_KEY, notsId);
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function changeBcgColor(bcgColor, noteId) {
  getNoteById(noteId).then((note) => {
    note.style.bcgColor = bcgColor;
    utilService.saveToStorage(NOTE_KEY, gNotes);
  });
}

function changeTxtColor(txtColor, noteId) {
  getNoteById(noteId).then((note) => {
    note.style.txtColor = txtColor;
    utilService.saveToStorage(NOTE_KEY, gNotes);
  });
}

function changeInfo(noteInfo, noteId) {
  getNoteById(noteId).then((note) => {
    note.info = noteInfo;
    utilService.saveToStorage(NOTE_KEY, gNotes);
  });
  return Promise.resolve("update");
}

function tooglePin(noteId) {
  getById(noteId).then((note) => {
    console.log(noteId);
    note.isPinned = !note.isPinned;
    utilService.saveToStorage(NOTE_KEY, gNotes);
    console.log(gNotes);
  });
}
// function getNoteById(noteId) {
//   const note = notesDB.find((note) => note.id === noteId);
//   return Promise.resolve(note);
// }

function getById(notsId) {
  return storageService.get(NOTE_KEY, notsId);
}

// function getEmptyNotes() {
//   return {
//     id: "",
//     title: "",
//     listPrice: { amount: 0 },
//   };
// }

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [
      _createNote(
        "note-txt",
        { titleTxt: "My first note", bodyTxt: "thank you vue," },
        "#444247"
      ),
      _createNote(
        "note-img",
        {
          titleTxt: "Img Note",
          url: "https://excursionsbarcelona.com/wp-content/uploads/2021/01/Harry-Potter-in-Barcelona.jpg",
        },
        "#e77254"
      ),
      _createNote(
        "note-video",
        {
          titleTxt: "Video Note",
          url: "https://www.youtube.com/watch?v=cXyPAxLvAQQ",
        },
        "#68936e"
      ),
      _createNote(
        "note-todos",
        {
          titleTxt: "My list",
          todos: [
            { todo: "learn Javascript", isDone: false },
            { todo: "do some css changes in my app", isDone: false },
            { todo: "learn vue a", isDone: false },
          ],
        },
        "#ca9e5b"
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
