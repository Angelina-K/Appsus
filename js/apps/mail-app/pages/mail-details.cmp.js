import { mailService } from "../services/mail-servies.js";
import titleDisplay from "../mail-cmps/titleForDisplay.cmp.js";
import { eventBus } from "../../../services/event-bus-service.js";

export default {
  name: "mail-Details",
  template: `
  <section v-if="this.email" class="mail-Details flex col">
    <button @click.nativ="goBack">Back</button>
    <titleDisplay :title="email.subject"/>
    <div class="flex">
      <strong>{{email.from}}</strong><span>hh@example.com</span><br>
      <span>{{email.to }}></span>
    </div>
    <p>{{email.body}}</p> 
  </section>
  `,
  data() {
    return {
      email: null,
    };
  },
  created() {
    // FIXME updates after refreshing
    const emailId = this.$route.params.mailId;
    mailService.getById(emailId).then((email) => {
      this.email = email;
      this.markAsRead();
    });
  },
  watch: {
    "$route.params.mailId": {
      handler() {
        const emailId = this.$route.params.mailId;
        mailService.getById(emailId).then((email) => {
          this.email = email;
          this.markAsRead();
        });
      },
      immediate: true,
    },
  },
  destroyed() {
    // console.log("destroys");
    // this.email = null;
  },
  methods: {
    goBack() {
      this.$router.push("/mail");
    },
    markAsRead() {
      if (this.email && !this.email.isRead) {
        this.email.isRead = true;
        eventBus.$emit("emailRead", this.email.id);
      }
      // if (this.email && !this.email.isRead) {
      //   console.log(this.email);
      //   mailService.save(this.email);
      // }
    },
  },
  components: {
    titleDisplay,
  },
};
