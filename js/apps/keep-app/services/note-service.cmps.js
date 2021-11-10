import { utilService } from "../../services/util-service.js";

export const noteService = {
  query,
  remove,
  getEmptyNots,
  save,
  getById,
};

const NOTE_KEY = "note";

function query() {
  return storageService.query(NOTE_KEY).then((nots) => {
    if (!nots || !nots.length) {
      storageService.postMany(NOTE_KEY, gNots);
      return gNots;
    }
    return nots;
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

function getEmptyNots() {
  return {
    id: "",
    title: "",
    listPrice: { amount: 0 },
  };
}

function _createNots() {
  let nots = utilService.loadFromStorage(NOTE_KEY);
  if (!nots || !nots.length) {
    nots = [];
    nots.push(_createNots("", 300));
    nots.push(_createNots("", 120));
    nots.push(_createNots("", 100));
    nots.push(_createNots("", 150));
    utilService.saveToStorage(NOTE_KEY, nots);
  }
  return nots;
}

function _createNots(title, price = 250) {
  const book = {
    id: utilService.makeId(),
    title,
    price,
  };
  return book;
}

const gNots = [
  {
    id: "n101",
    type: "note-txt",
    isPinned: true,
    info: {
      txt: "Fullstack Me Baby!",
    },
  },
  {
    id: "n102",
    type: "note-img",
    info: {
      url: "http://some-img/me",
      title: "Bobi and Me",
    },
    style: {
      backgroundColor: "#00d",
    },
  },
  {
    id: "n103",
    type: "note-todos",
    info: {
      label: "Get my stuff together",
      todos: [
        { txt: "Driving liscence", doneAt: null },
        { txt: "Coding power", doneAt: 187111111 },
      ],
    },
  },
];
