export default {
  name: "search",
  template: `
      <section class="search-con flex align-center">
      <i class="material-icons">search</i>
         
              <input @change.lazy="filtered" v-model="filterByTxt" class="search-bar" type="text" placeholder="Search mail">
         
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
