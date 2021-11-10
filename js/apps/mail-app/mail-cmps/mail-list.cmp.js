import mailPreview from "./mail-preview.cmp.js";
import titleDisplay from "./titleForDisplay.cmp.js";
export default {
  name: "mail-list",
  props: ["emails", "filterBy"],
  template: `
  <section class="mail-list">
    <titleDisplay :title="filterBy"/>
    <ul class="clean-list">
      <li v-for="email in emails" :class="{read: email.isRead }" :key="email.id">
          <!-- <router-link :to="'/mail/'+email.id" > -->
            <mailPreview :email="email" @click.native="emailClicked(email.id)"/>
          <!-- </router-link> -->
        </li>
    </ul>
    </section>
`,
  methods: {
    emailClicked(emailId) {
      this.$router.push("/mail/" + emailId);
    },
  },
  components: {
    mailPreview,
    titleDisplay,
  },
};
