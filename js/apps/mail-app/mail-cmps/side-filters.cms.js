export default {
  name: "side-filters",
  props: ["emails", "filterBy"],
  template: `
  <section class="side-filters flex col">
    <button>Inbox</button>
    <button>Starred</button>
    <button>Sent</button>
    <button>Drafts</button>
    <span>read:</span>
    <span>{{countUnread}}</span>
  </section>
`,
  data() {
    return {
      // filterBy: "index",
    };
  },
  created() {
    // this.filterBy = filterBy;
  },
  computed: {
    countUnread() {
      // const emails = this.emails;
      // console.log(emails);
    },
  },
};
