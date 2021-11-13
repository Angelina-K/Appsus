import { mailService } from "../services/mail-servies.js";
import titleDisplay from "../mail-cmps/titleForDisplay.cmp.js";
import { eventBus } from "../../../services/event-bus-service.js";

export default {
  name: "mail-Details",
  template: `
  <section v-if="this.email" class="mail-Details flex col">
    <button class="close-details-btn" @click.nativ="goBack">X</button>
    <div class="flex align-center space-between">
      <div class="flex align-center">
    <i class="material-icons">account_circle</i>
      <titleDisplay :title="email.subject"/>
      </div>
      <span>{{formateTime}}</span>
    </div>
    <div class="email-from flex ">
      <strong>{{email.from}} </strong>
      <span>hh@example.com</span> 
    </div>
    <span class="seperator">to:{{email.to}}</span>
    <p>{{email.body}}</p> 
  </section>
  `,
  data() {
    return {
      email: null,
    };
  },
  created() {
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
  computed: {
    formateTime() {
      return this.email.sentAt.substring(0, 21);
    },
  },
  components: {
    titleDisplay,
  },
};
