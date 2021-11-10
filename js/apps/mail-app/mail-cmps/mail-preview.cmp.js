export default {
  name: "mail-preview",
  props: ["email"],
  template: `
  <section class="mail-preview" >
   
      <input type="checkbox">
      <button>star</button>
      <strong>{{email.from}}</strong>
      <strong>{{email.subject}}</strong>
      <p>{{email.body}}</p>
      <p>{{email.sentAt}}</p>
      
   
</section>
`,
};
