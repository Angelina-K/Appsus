import { mailService } from "../services/mail-servies.js";
import mailList from "../mail-cmps/mail-list.cmp.js";

export default {
  name: "mail-app",
  template: `
    <section class="mail-app ">
        <mailList :emails="emailsToShow"/>

    </section>
`,
  data() {
    return {
      emails: null,
    };
  },
  created() {
    this.loadEmails();
  },
  methods: {
    loadEmails() {
      mailService.query().then((emails) => (this.emails = emails));
      console.log("emails", emails);
    },
  },
  computed: {
    emailsToShow() {
      return this.emails;
    },
  },
  components: {
    mailList,
  },
};
