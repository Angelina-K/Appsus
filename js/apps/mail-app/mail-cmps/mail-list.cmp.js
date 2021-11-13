import mailPreview from "./mail-preview.cmp.js";
import titleDisplay from "./titleForDisplay.cmp.js";
export default {
  name: "mail-list",
  props: ["emails", "filterBy"],
  template: `
  <section class="mail-list">
    <titleDisplay :title="filterBy"/>
    <ul class="clean-list">
      <li v-for="(email,idx) in emails" :class="{read: email.isRead }" class="flex align-center" :key="email.id">
          <label for="email">
              <input :value=email v-model="checkedEmails" @change="selected(email)" type="checkbox">
           </label>
          <button v-if="!email.isRemoved" :class="{starred: email.isStarred}" @click.stop="starred(email.id)">star</button>
            <mailPreview :email="email" :filterBy="filterBy" @click.native="emailClicked(email.id)"/>
        </li>
    </ul>
    </section>
`,
  data() {
    return {
      checkedEmails: [],
    };
  },
  // },
  // watch: {
  //   emails: {
  //     handler(newVal, oldVal) {
  //       console.log("emails has changed!");
  //     },
  //     deep: true,
  //   },
  // },
  // activeBtn(newVal, oldVal) {
  //   // console.log("this.activeBtn", this.activeBtn);
  //   this.$emit("filtered", this.activeBtn);
  // },
  methods: {
    emailClicked(emailId) {
      this.$router.push("/mail/" + emailId);
    },
    selected(email) {
      email.isSelected = !email.isSelected;
      // this.checkedEmails
      this.$emit("selected", email);
      // this.$emit("selected", this.checkedEmails);
    },
    starred(emailId) {
      // console.log("starred", email.isStarred);
      this.$emit("starred", emailId);
    },
    // mouseOver() {
    //   console.log("mouseOver");
    //   this.showBtns = true;
    // },
  },
  computed: {},
  components: {
    mailPreview,
    titleDisplay,
  },
};
