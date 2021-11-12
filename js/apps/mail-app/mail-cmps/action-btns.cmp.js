export default {
  name: "action-btns",
  props: ["selected"],
  template: `
        <section >
            <button @click="removeSelected">Delete selected</button>
            <button @click="markReadSelected">Mark as read</button>
        </section>
    `,
  data() {
    return {};
  },
  methods: {
    removeSelected() {
      this.$emit("removeSelected");
    },
    markReadSelected() {
      this.$emit("markReadSelected");
    },
  },
  computed: {},
  components: {},
};
