export default {
  name: "side-filters",
  props: ["emails", "filterBy"],
  template: `
  <section class="side-filters flex col">
    <button  @click="activeBtn = 'inbox'" :class="{active: activeBtn === 'inbox' }">
      Inbox</button>
    <button  @click="activeBtn = 'starred'" :class="{active: activeBtn === 'starred' }"
     >Starred</button>
    <button  @click="activeBtn = 'sent'" :class="{active: activeBtn === 'sent' }"
    >Sent</button>
    <button   @click="activeBtn = 'drafts'" :class="{active: activeBtn === 'drafts' }"
    >Drafts</button>
    <button   @click="activeBtn = 'read'" :class="{active: activeBtn === 'read' }"
    >Read</button>
    <button   @click="activeBtn = 'unread'" :class="{active: activeBtn === 'unread' }"
    >Unread</button>
    <span >read:</span>
    <span>{{countUnread}}</span>
  </section>
`,
  data() {
    return {
      activeBtn: this.filterBy,
    };
  },
  created() {
    // this.filterBy = filterBy;
    // this.$emit('filtered', { ...this.filterBy });
  },
  watch: {
    activeBtn(newVal, oldVal) {
      // console.log("this.activeBtn", this.activeBtn);
      this.$emit("filtered", this.activeBtn);
    },
  },
  computed: {
    countUnread() {},
  },
};
