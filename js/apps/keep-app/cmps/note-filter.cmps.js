export default {
  name: "note-filter",
  template: `
         <section class="filter-notes">
        <button ><i class="fas fa-search fa-lg"></i></button>

        <input @input="filter" v-model="filterBy.titleTxt" type="text" placeholder="Title">
        <select v-model="filterBy.type">
            <option>All</option>
            <option value="note-txt">Text Notes</option>
            <option value="note-img">Image Notes</option>
            <option value="note-video">Video Notes</option>
            <option value="note-todos">List Notes</option>
            <option value="note-map">Map Notes</option>
        </select>
    </section>
    `,
  data() {
    return {
      filterBy: {
        titleTxt: "",
        type: "All",
      },
    };
  },
  methods: {
    filter() {
      this.$emit("filtered", { ...this.filterBy });
    },
  },
};
