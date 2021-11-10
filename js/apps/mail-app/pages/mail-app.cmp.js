import { mailService } from "../services/mail-servies.js";
import mailList from "../mail-cmps/mail-list.cmp.js";

export default {
  name: "mail-app",
  template: `
    <section class="mail-app ">
        <!-- <mailList :emails="emailsToShow"/> -->
<h1>HIIII</h1>
    </section>
`,
  data() {
    return {
      emails: null,
    };
  },
  created() {
    // console.log("mail-app created");
    this.loadEmails();
  },
  methods: {
    loadEmails() {
      // console.log("loading emails");
      mailService.query().then((emails) => (this.emails = emails));
      // console.log("emails", emails);
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
