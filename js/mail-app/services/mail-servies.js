import { storageService } from "../../services/async-storage-service.js";
import { utilService } from "../../services/util-service.js";

export const bookService = {
  // query,
  // remove,
  // save,
  // getById,
  // addReview
};

const EMAIL_KEY = "emails";
const gEmails = createEmails();

console.log(gEmails);

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

function createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY);
  if (!emails || !emails.length) {
    emails = [
      _createEmail("work", "do some work", "adi"),
      _createEmail("something", "do something", "dani"),
      _createEmail("subject", "nice body", "ggg"),
      _createEmail("no subject", "whatever", "someone"),
    ];
  }
  utilService.saveToStorage(EMAIL_KEY, emails);
  return emails;
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
