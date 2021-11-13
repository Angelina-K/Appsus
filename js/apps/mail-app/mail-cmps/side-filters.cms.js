export default {
  name: "side-filters",
  props: ["emails", "filterBy", "read"],
  template: `
  <section class="side-filters flex col ">
    <button  @click="activeBtn = 'inbox'" :class="{active: activeBtn === 'inbox' }">
    <i class="material-icons">inbox</i>
      Inbox</button>
    <button  @click="activeBtn = 'starred'" :class="{active: activeBtn === 'starred' }">
    <i class="material-icons">star</i>
    Starred</button>
    <button  @click="activeBtn = 'sent'" :class="{active: activeBtn === 'sent' }">
    <i class="material-icons">send</i>
    Sent</button>
    <button   @click="activeBtn = 'drafts'" :class="{active: activeBtn === 'drafts' }">
    <i class="material-icons">description</i>
    Drafts</button>
    <button   @click="activeBtn = 'read'" :class="{active: activeBtn === 'read' }">
    <i class="material-icons">mark_email_read</i>
    Read</button>
    <button   @click="activeBtn = 'unread'" :class="{active: activeBtn === 'unread' }">
    <i class="material-icons">mark_email_unread</i>
    Unread</button>
    <button   @click="activeBtn = 'deleted'" :class="{active: activeBtn === 'deleted' }">
    <i class="material-icons">delete</i>
    Deleted</button>
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
