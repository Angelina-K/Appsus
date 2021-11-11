export default {
  name: "mail-preview",
  props: ["email"],
  template: `
  <section class="mail-preview pointer" >
      <strong>{{email.from}}</strong>
      <strong>{{email.subject}}</strong>
      <p>{{email.body}}</p>
      <p>{{email.sentAt}}</p>
</section>
`,
};
