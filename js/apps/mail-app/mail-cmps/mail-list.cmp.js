import mailPreview from "./mail-preview.cmp.js";
export default {
  name: "mail-list",
  props: ["emails"],
  template: `
    <ul class="clean-list">
        <li v-for="email in emails" :key="email.id">
            <mailPreview :email="email"/>
            <!-- {{emails}} -->
        </li>
    </ul>
`,
  components: {
    mailPreview,
  },
};
