export default {
  name: "keep-add",
  props: ["keepAdd"],
  template: `
        <section class="keep-add">
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
