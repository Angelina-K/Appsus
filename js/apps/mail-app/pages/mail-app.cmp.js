import { mailService } from "../services/mail-servies.js";
import mailList from "../mail-cmps/mail-list.cmp.js";
import sideFilters from "../mail-cmps/side-filters.cms.js";

export default {
  name: "mail-app",
  template: `
    <section class="mail-app flex">
    <sideFilters @filtered="setFilter" :filterBy='filterBy' :emails="emailsForDisplay"/>
        <mailList @starred="starEmail" @selected="selectEmail" :filterBy='filterBy' :emails="emailsForDisplay"/>
      
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
  // watch: {
  //   emails(newVal, oldVal) {
  //     console.log("txt has changed!");
  //     // this.loadEmails();
  //   },
  // },
  methods: {
    loadEmails() {
      mailService.query().then((emails) => {
        this.emails = emails;
        // console.log(emails);
      });
      // this.loadEmails();
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    selectEmail() {
      if (!this.selectedEmails) this.selectedEmails = [];
      this.selectedEmails.push(email);
    },
    starEmail(emailId) {
      if (this.emails) {
        mailService.getById(emailId).then((email) => {
          email.isStarred = !email.isStarred;
          mailService.save(email);
        });
      }
      this.loadEmails();
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
              return email.isStarred;
            case "sent":
              return email.from === "me";
            case "drafts":
              // FIXME add drafts
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
