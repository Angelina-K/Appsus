import noteImg from "./note-img.cmps.js";
import noteTxt from "./note-txt.cmps.js";
import noteVideo from "./note-video.cmps.js";
import noteTodos from "./note-todos.cmps.js";

export default {
  name: "note-switch",
  props: ["note"],
  template: `
    <section>
        <h1>
            <ul>
                <li class="note clean-list">
                <component :is="note.type" :note="note" @editNoteInfo="editNoteInfo" @delete-note="deleteNote" @change-bcg-color="changeBcgColor" @change-txt-color="changeTxtColor" @toogle-pin="tooglePin">
                </component>
                </li>
            </ul>
        </h1>
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
      this.$emit("change-bcg-color", this.bcgColor, this.note.id);
    },
    changeTxtColor() {
      this.$emit("change-txt-color", this.txtColor, this.note.id);
    },
    deleteNote() {
      this.$emit("deleteNote", this.note.id);
    },
  },
  components: {
    noteImg,
    noteTxt,
    noteVideo,
    noteTodos,
  },
};
