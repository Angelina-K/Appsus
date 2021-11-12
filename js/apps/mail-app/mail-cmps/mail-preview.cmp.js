import { eventBus } from "../../../services/event-bus-service.js";
export default {
  name: "mail-preview",
  props: ["email", "filterBy"],
  template: `
  <section  @mouseover="mouseOver" @mouseout="mouseOut" class="mail-preview pointer" >
      <strong>{{email.from}}</strong>
      <strong>{{shordSubject}}</strong>
      <p>{{shortBody}}</p>
      <div v-if="showBtns && filterBy!=='deleted'" class="prev-btns">
        <button @click.stop="read">Read</button>
        <button @click.stop="remove">Del</button>
      </div>
      <p v-else>{{shortDate}}</p>
  </section>
`,
  data() {
    return {
      showBtns: false,
    };
  },
  created() {},
  methods: {
    mouseOver() {
      this.showBtns = true;
    },
    mouseOut() {
      this.showBtns = false;
    },
    read() {
      eventBus.$emit("emailRead", this.email.id);
    },
    remove() {
      this.email.isRemoved = true;
      // console.log(this.email.id);
      eventBus.$emit("removeEmail", this.email.id);
    },
  },
  computed: {
    shortBody() {
      const txt = this.email.body;
      return txt.length > 40 ? txt.substring(0, 40) : txt;
    },
    shordSubject() {
      const txt = this.email.subject;
      return txt.length > 20 ? txt.substring(0, 20) : txt;
    },
    shortDate() {
      const date = this.email.sentAt;
      return date.substring(4, 10);
    },
  },
};
