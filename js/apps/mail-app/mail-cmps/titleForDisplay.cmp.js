export default {
  name: "title-for-display",
  props: ["title"],
  template: `
    <section class="mail-list">
        <h2>{{titleForDisplay}}</h2>
    </section>
`,
  computed: {
    titleForDisplay() {
      const words = this.title.split(" ");
      const title = words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      });
      const newtitle = title.join(" ");
      return newtitle;
    },
  },
  components: {},
};