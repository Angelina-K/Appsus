import { eventBus } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail-servies.js";

export default {
  template: `
    <section v-if="shouldShow" class="email-compose flex col">
      <form @submit.prevent="onSend">
        <!-- <div class="email-compose-container"> -->
        <button class="title-btn" @click="setExpand">New Message</button>
        <!-- <label for="">To</label> -->
        <input v-if="isRecipientClicked" v-on:click="onRecipientFormClick(false)"  :placeholder="recipient" class="email-compose-recipients">
            <div v-else class="to-form-input-container">
                <!-- <span>To</span> -->
                <label>
                <span v-if="isRecipientClicked">to</span><input v-model="emptyEmail.to" placeholder="" class="to-form-input" >
                </label>
                <!-- <button class="cc-bcc-button">Cc</button>
                <button class="cc-bcc-button">Bcc</button> -->
            </div>
            <!-- <input v-model="emptyEmail.subject"   placeholder="Subject" class="email-compose-subject"> -->
        <input v-model="emptyEmail.subject"  v-on:click="onRecipientClick(true)" placeholder="Subject" class="email-compose-subject">
        <textarea v-model="emptyEmail.body"" v-on:click="onRecipientClick(true)" class="email-compose-contents"></textarea>
        <!-- <textarea v-model="emptyEmail.body"  class="email-compose-contents"></textarea> -->
        <div class="bottom-toolbar"> 
            <!-- <button @click="onSend" class="send-button">Send</button> -->
            <button type="submit" class="send-button">Send</button>
        </div>
        <!-- </div> -->
        <button @click="close">Close</button>
        </form>
    </section>
    `,
  data() {
    return {
      emptyEmail: {
        subject: "",
        body: "",
        isRead: false,
        isStarred: false,
        isRemoved: false,
        sentAt: "",
        from: "me",
        to: "",
      },
      // emptyEmail: null,
      shouldShow: false,
      // body: "",
      // recipient: "",
      // contents: "",
      isRecipientClicked: false,
      // subject: "",
      expand: true,
    };
  },
  created() {
    eventBus.$on("showCompose", this.show);
    // this.emptyEmail = mailService.getEmpyEmail();
    // if (this.emptyEmail) {
    //   console.log(this.emptyEmail);
  },
  methods: {
    show() {
      this.shouldShow = true;
      document.body.classList.add("modal-open");
      // document.body.classList.add("open-compose");
    },
    close() {
      document.body.classList.remove("modal-open");
      this.shouldShow = false;
    },
    onRecipientFormClick(val) {
      this.isRecipientClicked = val;
      this.recipient = this.recipient == "Recipients" ? "" : this.recipient;
    },
    onRecipientClick(val) {
      this.isRecipientClicked = val;
      this.recipient = this.recipient ? this.recipient : "Recipients";
    },
    onSend() {
      (this.emptyEmail.sentAt = new Date().toLocaleString()),
        mailService.save(this.emptyEmail).then(this.close);
    },
    setExpand() {
      this.expand = !this.expand;
    },
  },
};
