import { eventBus } from "../../../services/event-bus-service.js";
export default {
  template: `
    <section v-if="shouldShow" class="email-compose">
        <div class="email-compose-container">
        <button class="compose-email-title-button" @click="setExpand()">New Message</button>
        <input v-if="isRecipientClicked" v-on:click="onRecipientFormClick(false)"  :placeholder="recipient" class="email-compose-recipients">
            <div v-else class="to-form-input-container">
                <span>To</span>
                <input v-model="recipient" placeholder="" class="to-form-input" >
                <button class="cc-bcc-button">Cc</button>
                <button class="cc-bcc-button">Bcc</button>
            </div>
        <input v-model="subject"  v-on:click="onRecipientClick(true)" placeholder="Subject" class="email-compose-subject"">
        <textarea v-model="message" v-on:click="onRecipientClick(true)" placeholder="" class="email-compose-contents"></textarea>
        <div class="bottom-toolbar"> 
            <button @click="onSend()" class="send-button">Send</button>
        </div>
        </div>
        <button @click="close">Close</button>
        
    </section>
    `,
  data() {
    return {
      shouldShow: false,
      message: "",
      recipient: "",
      contents: "",
      isRecipientClicked: false,
      subject: "",
      expand: true,
    };
  },
  created() {
    eventBus.$on("sohwCompose", this.show);
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
      console.log(this.recipient, this.subject, this.message);
    },
    setExpand() {
      this.expand = !this.expand;
    },
  },
};
