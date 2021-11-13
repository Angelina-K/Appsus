import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/util-service.js";

export const mailService = {
  query,
  removedQuery,
  getById,
  remove,
  save,
  saveToRemoved,
  getEmpyEmail,
  // addReview
};

const EMAILS_KEY = "emails";
let gEmails;

const REMOVED_KEY = "removedEmails";
let gRemoved = [];

_createEmails();

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

// const email = {
//   id: "e101",
//   subject: "Miss you!",
//   body: "Would love to catch up sometimes",
//   isRead: false,
//   sentAt: 1551133930594,
//   // to: "momo@momo.com",
// };

const criteria = {
  status: "inbox/sent/trash/draft",
  txt: "puki", // no need to support complex text search
  isRead: true, // (optional property, if missing: show all)
  isStared: true, // (optional property, if missing: show all)
  lables: ["important", "romantic"], // has any of the labels
};

function query() {
  return storageService.query(EMAILS_KEY);
}

function removedQuery() {
  return storageService.query(REMOVED_KEY);
}

function getById(emailId) {
  return storageService.get(EMAILS_KEY, emailId);
}

// function save(email) {
//   if (email.id) {
//     console.log("saving to storage");
//     return storageService.put(EMAILS_KEY, email);
//   } else {
//     console.log("creating new to storage", email);
//     return storageService.post(EMAILS_KEY, email);
//   }
// }
function save(email) {
  if (email.id) return storageService.put(EMAILS_KEY, email);
  else return storageService.post(EMAILS_KEY, email);
}

function remove(emailId) {
  return storageService.remove(EMAILS_KEY, emailId);
}

function saveToRemoved(email) {
  gRemoved.push(email);
  utilService.saveToStorage(REMOVED_KEY, gRemoved);
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAILS_KEY);
  if (!emails || !emails.length) {
    emails = [
      _createEmail("work", "do some work", "me", "to: adi"),
      _createEmail(
        "somethinggggggggggggggggggg",
        "do something kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
        "Aliexpress",
        "me"
      ),
      _createEmail("subjecttttttttttttttt", "nice body", "eBay", "me"),
      _createEmail("no subject", "whatever", "next.uk", "me"),
    ];
  }
  gEmails = emails;
  // console.log("gEmails", gEmails);
  utilService.saveToStorage(EMAILS_KEY, gEmails);
}
function getEmpyEmail() {
  return {
    subject: "",
    body: "",
    isRead: false,
    isStarred: false,
    isRemoved: false,
    isSelected: false,
    sentAt: "",
    from: "me",
    to: "",
  };
}
function _createEmail(subject, body, from, to) {
  const email = {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    isStarred: false,
    isRemoved: false,
    isSelected: false,
    sentAt: new Date().toString(),
    from,
    to,
    // fromName: from,
    // ${from}@momo.com
  };
  // new Date().toLocaleString(),
  return email;
}
