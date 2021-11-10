export default {
  name: "note-add",
  props: ["noteAdd"],
  template: `
        <section class="note-add">
        <div>
            <input class="add-input"  v-model.lazy="add" type="text" placeholder="What is on your mind...">
        </div>
        </section>`,
  data() {
    return {
      add: "",
    };
  },
};
