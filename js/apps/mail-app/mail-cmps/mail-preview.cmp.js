export default {
  name: "mail-preview",
  props: ["email"],
  template: `
  <section class="mail-preview flex align-center">
    <div class=" preview-left flex">
      <input type="checkbox">
      <button>star</button>
      <strong>{{email.from}}</strong>
    </div>
    <div class="preview-right flex align-center">
      <strong>{{email.subject}}</strong>
      <p>{{email.body}}</p>
      <p>{{email.sentAt}}</p>
    </div>
</section>
`,
};
