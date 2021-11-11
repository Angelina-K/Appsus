import noteImg from "./note-img.cmps.js";
import noteTxt from "./note-txt.cmps.js";
import noteVideo from "./note-video.cmps.js";
import noteTodos from "./note-todos.cmps.js";

export default {
  name: "note-list",
  props: ["note", "filterType", "searchByKeyword"],
  template: `
    <section>
        <h1>Pinned Notes:</h1>
            <ul>
                <li class="clean-list">
                <component :is="note.type" :note="note" @editNoteInfo="editNoteInfo" @deleteNote="deleteNote" @openBcgColor="changeBcgColor" @openTxtColor="changeTxtColor" @tooglePin="tooglePin">
                </component>
                </li>
            </ul>
        <h1>Unpinned Notes:</h1>
         <!-- <ul>
                <li class="clean-list">
                <component :is="note.type" :note="note" @editNoteInfo="editNoteInfo" @deleteNote="deleteNote" @openBcgColor="changeBcgColor" @openTxtColor="changeTxtColor" @tooglePin="tooglePin">
                </component>
                </li>
            </ul> -->
    </section>
    `,
  methods: {
    tooglePin() {
      this.$emit("tooglePin", this.note.id);
      console.log(this.note.id);
    },
    editNoteInfo() {
      this.$emit("editNoteInfo", this.note);
      console.log(this.note);
    },
    openTxtColor() {
      this.$refs.txtColor.click();
    },
    openBcgColor() {
      this.$refs.fillColor.click();
    },
    changeBcgColor() {
      this.$emit("changeBcgColor", this.bcgColor, this.note.id);
    },
    changeTxtColor() {
      this.$emit("changeTxtColor", this.txtColor, this.note.id);
    },
    deleteNote(noteId) {
      this.$emit("deleteNote", noteId);
    },
  },
  computed: {
    pinnedNotes() {},
  },
  components: {
    noteImg,
    noteTxt,
    noteVideo,
    noteTodos,
  },
};
