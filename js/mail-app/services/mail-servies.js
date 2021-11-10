import { storageService } from "../../services/async-storage-service.js";
import { utilService } from "../../services/util-service.js";

export const mailService = {
  query,
  // remove,
  // save,
  // getById,
  // addReview
};

const EMAIL_KEY = "emails";
let gEmails;
_createEmails();

console.log("gEmails", gEmails);

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

const email = {
  id: "e101",
  subject: "Miss you!",
  body: "Would love to catch up sometimes",
  isRead: false,
  sentAt: 1551133930594,
  to: "momo@momo.com",
};

const criteria = {
  status: "inbox/sent/trash/draft",
  txt: "puki", // no need to support complex text search
  isRead: true, // (optional property, if missing: show all)
  isStared: true, // (optional property, if missing: show all)
  lables: ["important", "romantic"], // has any of the labels
};

function query() {
  console.log("getting query");
  return storageService.query(EMAIL_KEY);
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY);
  if (!emails || !emails.length) {
    emails = [
      _createEmail("work", "do some work", "adi"),
      _createEmail("something", "do something", "dani"),
      _createEmail("subject", "nice body", "ggg"),
      _createEmail("no subject", "whatever", "someone"),
    ];
  }
  gEmails = emails;
  utilService.saveToStorage(EMAIL_KEY, gEmails);
}

function _createEmail(subject, body, sendTo) {
  const email = {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    sentAt: new Date().toLocaleString(),
    to: `${sendTo}@momo.com`,
  };
  return email;
}
