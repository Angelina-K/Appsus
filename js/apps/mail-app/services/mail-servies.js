import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/util-service.js";

export const mailService = {
  query,
  getById,
  // remove,
  save,
  // getById,
  // addReview
};

const EMAILS_KEY = "emails";
let gEmails;

_createEmails();

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
  return storageService.query(EMAILS_KEY);
}

function getById(emailId) {
  return storageService.get(EMAILS_KEY, emailId);
}

function save(email) {
  // console.log("saveing mail", email);
  if (email.id) return storageService.put(EMAILS_KEY, email);
  else return storageService.post(EMAILS_KEY, email);
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
  // console.log("gEmails", gEmails);
  utilService.saveToStorage(EMAILS_KEY, gEmails);
}

function _createEmail(subject, body, from, to) {
  const email = {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    isStarred: false,
    sentAt: new Date().toLocaleString(),
    from,
    to,
    // fromName: from,
    // ${from}@momo.com
  };
  return email;
}

// template: `
//     <div class="book-preview">
//         <h3> Title: {{book.title}} </h3>
//         <p :class="price"> Price: {{currencyIcon}}</p>
//         <img class="book-img" :src="book.thumbnail">
//         <img class="sale-img" :src=sale>
//     </div>`,

//     computed: {
//         price() {
//             if (this.book.listPrice.amount > 150) return 'red'
//             if (this.book.listPrice.amount < 20) return 'green'
//         },
