import { mailService } from "../services/mail-servies.js";
import mailList from "../mail-cmps/mail-list.cmp.js";

export default {
  name: "mail-app",
  template: `
    <section class="mail-app ">
        <mailList :emails="emailsForDisplay"/>
<!-- <h1>{{emails}}</h1> -->
    </section>
`,
  data() {
    return {
      emails: null,
      filterBy: "inbox",
    };
  },
  created() {
    this.loadEmails();
  },
  methods: {
    loadEmails() {
      mailService.query().then((emails) => (this.emails = emails));
    },
  },
  computed: {
    emailsForDisplay() {
      // const emailsToShow = this.emailsToShow;
      // const emails = this.emails;
      // return emails[emailsToShow];
      return this.emails;
    },
  },
  components: {
    mailList,
  },
};
