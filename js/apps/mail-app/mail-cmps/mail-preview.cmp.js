export default {
  name: "mail-preview",
  props: ["email"],
  template: `
  <section  @mouseover="mouseOver" @mouseout="mouseOut" class="mail-preview pointer" >
      <strong>{{email.from}}</strong>
      <strong>{{email.subject}}</strong>
      <p>{{email.body}}</p>
      <div v-if="showBtns" class="prev-btns">
        <button>Read</button>
        <button>Del</button>
      </div>
      <p v-else>{{email.sentAt}}</p>
  </section>
`,
  data() {
    return {
      showBtns: false,
    };
  },
  methods: {
    mouseOver() {
      this.showBtns = true;
    },
    mouseOut() {
      this.showBtns = false;
    },
  },
};
