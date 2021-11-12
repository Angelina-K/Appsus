import { eventBus } from "../../../services/event-bus-service.js";
export default {
  name: "mail-preview",
  props: ["email", "filterBy"],
  template: `
  <section  @mouseover="mouseOver" @mouseout="mouseOut" class="mail-preview pointer" >
      <strong>{{email.from}}</strong>
      <strong>{{email.subject}}</strong>
      <p>{{email.body}}</p>
      <div v-if="showBtns && filterBy!=='deleted'" class="prev-btns">
        <button @click.stop="read">Read</button>
        <button @click.stop="remove">Del</button>
      </div>
      <p v-else>{{email.sentAt}}</p>
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
};
