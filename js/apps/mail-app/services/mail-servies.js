import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/util-service.js";

export const mailService = {
  query,
  // remove,
  // save,
  // getById,
  // addReview
};

const EMAILS_KEY = "emails";
// const SENT_KEY = "sentEmails";
let gEmails;
// let gSent;

_createEmails();

// console.log("gEmails", gEmails);

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
  // to: "momo@momo.com",
};

const criteria = {
  status: "inbox/sent/trash/draft",
  txt: "puki", // no need to support complex text search
  isRead: true, // (optional property, if missing: show all)
  isStared: true, // (optional property, if missing: show all)
  lables: ["important", "romantic"], // has any of the labels
};

function query() {
  // console.log("getting query");
  return storageService.query(EMAILS_KEY);
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAILS_KEY);
  if (!emails || !emails.length) {
    emails = [
      _createEmail("work", "do some work", "me", "to: adi"),
      _createEmail("something", "do something", "Aliexpress", "me"),
      _createEmail("subject", "nice body", "eBay", "me"),
      _createEmail("no subject", "whatever", "next.uk", "me"),
    ];
  }
  gEmails = emails;
  utilService.saveToStorage(EMAILS_KEY, gEmails);
}

function _createEmail(subject, body, from, to) {
  const email = {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    sentAt: new Date().toLocaleString(),
    from,
    to,
    // fromName: from,
    // ${from}@momo.com
  };
  return email;
}
// function _createSentEmail(subject, body, to) {
//   const email = {
//     id: utilService.makeId(),
//     subject,
//     body,
//     // isRead: false,
//     sentAt: new Date().toLocaleString(),
//     to: `${sendTo}@momo.com`,
//     toName: to,
//   };
//   return email
// }
