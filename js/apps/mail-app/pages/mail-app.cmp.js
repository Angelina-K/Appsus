import { mailService } from "../services/mail-servies.js";
import { eventBus } from "../../../services/event-bus-service.js";
import mailList from "../mail-cmps/mail-list.cmp.js";
import sideFilters from "../mail-cmps/side-filters.cms.js";
import compose from "../pages/compose.cmp.js";
import searchFilter from "../mail-cmps/search-filter.cmp.js";

export default {
  name: "mail-app",
  template: `
    <!-- <section class="mail-app flex col">
      <div class="flex space-between">
        <button @click="openCompose" class="compose-btn">Compose</button>
      <searchFilter/>
      </div>
      <div class="flex ">
        <sideFilters @filtered="setFilter" :filterBy='filterBy' :emails="emailsForDisplay" :read="coutRead"/>
        <mailList @starred="starEmail" @selected="selectEmail" :filterBy='filterBy' :emails="emailsForDisplay"/>
      </div>
      <compose/>
    </section> -->

    <section class="mail-app flex ">
      <div class="flex col">
        <button @click="openCompose" class="compose-btn">Compose</button>
        <sideFilters @filtered="setFilter" :filterBy='filterBy' :emails="emailsForDisplay" :read="coutRead"/>
      </div>
      <div class="search-list flex col">
        <searchFilter/>
        <mailList @starred="starEmail" @selected="selectEmail" :filterBy='filterBy' :emails="emailsForDisplay"/>
        </div>
      <compose/>
    </section>



`,
  data() {
    return {
      emails: null,
      filterBy: "inbox",
      selectedEmails: null,
      removedEmails: null,
    };
  },
  created() {
    this.loadEmails();
    eventBus.$on("emailRead", this.markAsRead);
    eventBus.$on("removeEmail", this.remove);
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
      });
      mailService.removedQuery().then((emails) => {
        this.removedEmails = emails;
      });
    },
    setFilter(filterBy) {
      console.log(filterBy);
      this.filterBy = filterBy;
    },
    selectEmail() {
      if (!this.selectedEmails) this.selectedEmails = [];
      this.selectedEmails.push(email);
    },
    remove(emailId) {
      mailService.getById(emailId).then((email) => {
        email.isRemoves = true;
        console.log(email);
        mailService.saveToRemoved(email);
      });
      mailService.remove(emailId).then(this.loadEmails);
    },
    starEmail(emailId) {
      if (this.emails) {
        mailService.getById(emailId).then((email) => {
          email.isStarred = !email.isStarred;
          mailService.save(email).then(this.loadEmails);
        });
      }
      this.loadEmails();
    },
    markAsRead(emailId) {
      if (this.emails) {
        mailService.getById(emailId).then((email) => {
          email.isRead = !email.isRead;
          mailService.save(email).then(this.loadEmails);
        });
      }
    },
    openCompose() {
      // this.showCompose = true;
      eventBus.$emit("sohwCompose");

      // eventBus.$emit("sohwCompose");
    },
  },
  computed: {
    emailsForDisplay() {
      if (this.emails && this.filterBy) {
        let emailsToShow;
        if (this.filterBy === "deleted") {
          emailsToShow = this.removedEmails;
        } else {
          emailsToShow = this.emails.filter((email) => {
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
        }
        return emailsToShow;
      }
    },
    coutRead() {
      if (this.emails) {
        const allEmails = this.emails;
        const read = allEmails.filter((email) => {
          return email.isRead;
        });
        // console.log(allEmails);
        return `${read.length} / ${allEmails.length}`;
      }
    },
  },
  components: {
    mailList,
    sideFilters,
    compose,
    searchFilter,
  },
};
