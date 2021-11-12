export default {
  name: "search",
  template: `
      <section >
          <label for="search">
              <input @change.lazy="filtered" v-model="filterByTxt" class="search-bar" type="text" placeholder="Search mail">
          </label>
      </section>
  `,
  data() {
    return {
      filterByTxt: "",
    };
  },
  methods: {
    filtered() {
      this.$emit("filteredByTxt", this.filterByTxt);
    },
  },
  computed: {},
  components: {},
};
