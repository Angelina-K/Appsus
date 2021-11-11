export default {
  name: "note-filter",
  template: `
         <section class="filter-notes">
        <button :class="{'active': searchKeyword}"><i class="fas fa-search fa-lg"></i></button>
        <input type="text" v-model="searchKeyword" placeholder="Search notes by title" @input="searchByKeyword"/>
        <select v-model="filterType" @change="setFilter">
            <option>All</option>
            <option value="note-txt">Text Notes</option>
            <option value="note-img">Image Notes</option>
            <option value="note-video">Video Notes</option>
            <option value="note-audio">Audio Notes</option>
            <option value="note-todos">List Notes</option>
            <option value="note-map">Map Notes</option>
        </select>
    </section>
    `,
  data() {
    return {
      filterType: "All",
      searchKeyword: "",
      isActive: false,
    };
  },
  methods: {
    setFilter() {
      this.$emit("set-filter", this.filterType);
    },
    toggleActive() {
      this.isActive = !this.isActive;
    },
    searchByKeyword() {
      this.$emit("set-search", this.searchKeyword);
    },
  },
};
