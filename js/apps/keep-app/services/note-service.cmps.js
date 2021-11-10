import { utilService } from "../../../services/util-service.js";
import { storageService } from "../../../services/async-storage-service.js";

export const noteService = {
  query,
  remove,
  getEmptyNotes,
  save,
  getById,
};

const NOTE_KEY = "note";
var gNots = _createNotes();
// console.log("notes", gNots);

function query() {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (!notes || !notes.length) {
      storageService.postMany(NOTE_KEY, gNots);
      return gNots;
    }
    // console.log("notes", notes);
    return notes;
  });
}

function remove(notsId) {
  return storageService.remove(NOTE_KEY, notsId);
}

function save(nots) {
  if (nots.id) return storageService.put(NOTE_KEY, nots);
  else return storageService.post(NOTE_KEY, nots);
}

function getById(notsId) {
  return storageService.get(NOTE_KEY, notsId);
}

function getEmptyNotes() {
  return {
    id: "",
    title: "",
    listPrice: { amount: 0 },
  };
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY);
  if (!notes || !notes.length) {
    notes = [];
    notes.push(
      _createNote("note-txt", {
        titleTxt: "My first note",
        bodyTxt: "Non eram nescius, Brute,",
      })
    ),
      notes.push(_createNote("", 300));
    notes.push(_createNote("", 120));
    notes.push(_createNote("", 100));
    notes.push(_createNote("", 150));
    utilService.saveToStorage(NOTE_KEY, notes);
  }
  return notes;
}

function _createNote(type, info, bcgColor = "rgb(212, 209, 209)") {
  return {
    id: utilService.makeId(),
    type: type,
    isPinned: false,
    isMarked: false,
    isOpen: false,
    createdTime: Date.now(),
    style: {
      txtColor: "#000",
      bcgColor,
    },
    info: info,
  };
}

// const gNots = [
//   {
//     id: "n101",
//     type: "note-txt",
//     isPinned: true,
//     info: {
//       txt: "Fullstack Me Baby!",
//     },
//   },
//   {
//     id: "n102",
//     type: "note-img",
//     info: {
//       url: "http://some-img/me",
//       title: "Bobi and Me",
//     },
//     style: {
//       backgroundColor: "#00d",
//     },
//   },
//   {
//     id: "n103",
//     type: "note-todos",
//     info: {
//       label: "Get my stuff together",
//       todos: [
//         { txt: "Driving liscence", doneAt: null },
//         { txt: "Coding power", doneAt: 187111111 },
//       ],
//     },
//   },
// ];
