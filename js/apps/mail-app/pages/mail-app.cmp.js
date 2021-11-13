import { mailService } from "../services/mail-servies.js";
import { eventBus } from "../../../services/event-bus-service.js";
import mailList from "../mail-cmps/mail-list.cmp.js";
import sideFilters from "../mail-cmps/side-filters.cms.js";
import compose from "../pages/compose.cmp.js";
import searchFilter from "../mail-cmps/search-filter.cmp.js";
// import sortEmails from "../../mail-app/mail-cmps/sort-emails.cmp.js";
import actionBtns from "../mail-cmps/action-btns.cmp.js";

export default {
  name: "mail-app",
  template: `
    <section class="mail-app flex ">
      <div class="flex col">
        <button @click="openCompose" class="compose-btn">Compose</button>
        <sideFilters @filtered="setFilter" :filterBy='filterBy' :emails="emailsForDisplay" :read="coutRead"/>
      </div>
      <div class="search-list flex col">
        <searchFilter @filteredByTxt="setFilter"/>
        <!-- <sortEmails @sorted="setSorting"/> -->
        <actionBtns v-if="isSelectedEmails" @removeSelected="removeSelected" @markReadSelected="markAsRead"/>
        <mailList @starred="starEmail" @selected="selectEmails" :filterBy='filterBy' :emails="emailsForDisplay"/>
        </div>
      <compose/>
    </section>
    
`,
  data() {
    return {
      emails: null,
      filterBy: "inbox",
      // sortBy: null,
      isSelectedEmails: false,
      removedEmails: null,
    };
  },
  created() {
    this.loadEmails();
    eventBus.$on("emailRead", this.markAsRead);
    eventBus.$on("removeEmail", this.remove);
    eventBus.$on("emailSent", this.loadEmails);
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
      this.filterBy = filterBy;
    },
    setSorting(sortBy) {
      this.sortBy = sortBy;
      console.log(this.sortBy);
    },
    // sortEmailsBy(emails) {
    //   if (!this.sortBy) this.emails = emails;
    //   if (this.sortBy === "subject") {
    //     emails.sort(function (a, b) {
    //       return a.subject.toLowerCase() < b.subject.toLowerCase() ? 1 : -1;
    //     });
    //   }
    //   this.emails = emails;
    // },

    selectEmails(email) {
      mailService.save(email).then(this.loadEmails);
      const isSelected = this.emails.some((email) => email.isSelected);
      this.isSelectedEmails = isSelected;
    },

    remove(emailId) {
      mailService.getById(emailId).then((email) => {
        email.isRemoved = true;
        mailService.saveToRemoved(email);
      });
      mailService.remove(emailId).then(this.loadEmails);
    },

    // removeSelected() {
    //   this.emails.forEach((email) => {
    //     if (email.isSelected && !email.isRemoved) {
    //       mailService.getById(email.id).then((email) => {
    //         email.isRemoved = true;
    //         mailService.saveToRemoved(email);
    //         mailService.remove(email.id);
    //         this.loadEmails();
    //       });
    //       // this.remove(email.id);
    //     }
    //   });
    // },
    removeSelected() {
      const selected = this.emails.filter((email) => email.isSelected);
      selected.forEach((email) => {
        this.remove(email.id);
      });
      this.loadEmails();
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
      eventBus.$emit("showCompose");
    },
  },
  computed: {
    // FIXME after deleting search bar showes all emails but inbox btn is active
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
                return (
                  email.from.toLowerCase().includes(this.filterBy) ||
                  email.subject.toLowerCase().includes(this.filterBy) ||
                  email.body.toLowerCase().includes(this.filterBy)
                );
              // return email;
            }
          });
        }
        // sortEmailsBy(emailsToShow);
        return emailsToShow;
      }
      // return sortEmailsBy(this.emails);
      return this.emails;
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
    // sortEmails,
    actionBtns,
  },
};
