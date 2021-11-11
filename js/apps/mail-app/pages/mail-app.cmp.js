import { mailService } from "../services/mail-servies.js";
import mailList from "../mail-cmps/mail-list.cmp.js";
import sideFilters from "../mail-cmps/side-filters.cms.js";

export default {
  name: "mail-app",
  template: `
    <section class="mail-app flex">
    <sideFilters @filtered="setFilter" :filterBy='filterBy' :emails="emailsForDisplay"/>
        <mailList @selected="selectEmail" :filterBy='filterBy' :emails="emailsForDisplay"/>
    </section>
`,
  data() {
    return {
      emails: null,
      filterBy: "inbox",
      selectedEmails: null,
    };
  },
  created() {
    this.loadEmails();
  },
  methods: {
    loadEmails() {
      mailService.query().then((emails) => (this.emails = emails));
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    selectEmail(emailId) {
      if (!this.selectedEmails) this.selectedEmails = [];
      mailService.getById(emailId).then((email) => {
        this.selectedEmails.push(email);
      });
    },
  },
  computed: {
    emailsForDisplay() {
      if (this.emails && this.filterBy) {
        const emailsToShow = this.emails.filter((email) => {
          switch (this.filterBy) {
            case "inbox":
              return email.to === "me";
            case "starred":
              console.log("starred");
              break;
            case "sent":
              return email.from === "me";
            case "drafts":
              console.log("drafts");
              break;
            case "read":
              return email.isRead;
            case "unread":
              return !email.isRead;
            default:
              return email;
          }
        });
        return emailsToShow;
      }
    },
  },
  components: {
    mailList,
    sideFilters,
  },
};
