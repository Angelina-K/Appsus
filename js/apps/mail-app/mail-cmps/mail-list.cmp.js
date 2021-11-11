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
          <input @change="selected(email)" type="checkbox">
          <button :name="idx" :class="{starred: email.isStarred}" @click="starred(email.id,idx)">star</button>
            <mailPreview :email="email" @click.native="emailClicked(email.id)"/>
        </li>
    </ul>
    </section>
`,
  // data() {
  //   return {
  //     starBtns: null,
  // };
  // },
  methods: {
    emailClicked(emailId) {
      this.$router.push("/mail/" + emailId);
    },
    selected(emailId) {
      this.$emit("selected", emailId);
    },
    starred(emailId) {
      this.$emit("starred", emailId);
    },
  },
  computed: {},
  components: {
    mailPreview,
    titleDisplay,
  },
};
