import mailPreview from "./mail-preview.cmp.js";
import titleDisplay from "./titleForDisplay.cmp.js";
export default {
  name: "mail-list",
  props: ["emails", "filterBy"],
  template: `
  <section class="mail-list">
    <titleDisplay :title="filterBy"/>
    <ul class="clean-list">
      <li v-for="email in emails" :class="{read: email.isRead }" class="flex align-center" :key="email.id">
          <input @change="selected(email)" type="checkbox">
          <button :class="{starred: email.isStarred}" @click="starred(email.id)">star</button>
            <mailPreview :email="email" @click.native="emailClicked(email.id)"/>
        </li>
    </ul>
    </section>
`,
  data() {
    return {
      // listEmails: this.emails,
    };
  },
  methods: {
    emailClicked(emailId) {
      this.$router.push("/mail/" + emailId);
    },
    selected(emailId) {
      // console.log(this.listEmails);
      this.$emit("selected", emailId);
    },
    starred(emailId) {
      this.$emit("starred", emailId);
    },
  },
  components: {
    mailPreview,
    titleDisplay,
  },
};
