export default {
  name: "mail-preview",
  props: [email],
  template: `
  <section class="mail-preview flex align-center">
    <div class=" preview-left flex">
      <input type="checkbox">
      <button>star</button>
      <strong>Mail From</strong>
    </div>
    <div class="preview-right flex align-center">
      <strong>mail subject</strong>
      <p>mail body</p>
      <p>date</p>
    </div>
</section>
`,
};
