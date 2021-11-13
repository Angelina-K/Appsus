export default {
  name: "side-filters",
  props: ["emails", "filterBy", "read"],
  template: `
  <section class="side-filters flex col ">
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
    <button   @click="activeBtn = 'deleted'" :class="{active: activeBtn === 'deleted' }"
    >Deleted</button>
    <span >read:</span>
    <span>{{read}}</span>
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
    // this.countUnread();
  },
  watch: {
    activeBtn(newVal, oldVal) {
      // console.log("this.activeBtn", this.activeBtn);
      // console.log(this.activeBtn);
      this.$emit("filtered", this.activeBtn);
    },
  },
  computed: {
    // countUnread() {
    //   console.log(this.emails);
    // },
  },
};
