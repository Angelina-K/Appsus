import noteImg from "./note-img.cmps.js";
import noteTxt from "./note-txt.cmps.js";
import noteVideo from "./note-video.cmps.js";
import noteTodos from "./note-todos.cmps.js";
import noteMap from "../cmps/note-map.cmps.js";
import noteEdit from "./note-edit.cmps.js";
import { utilService } from "../../../services/util-service.js";

export default {
  name: "note-list",
  props: ["notes", "filter"],
  template: `
    <section>
        <h4  >Pinned Notes:</h4>
            <ul  class="notes-section">
                <li class="clean-list" v-for="note in notes">
                <component @click.native="selected(note)" :is="note.type" :note="note" @editNoteInfo="editNoteInfo" @deleteNote="deleteNote" @openBcgColor="changeBcgColor" @openTxtColor="changeTxtColor" @tooglePin="tooglePin">
                </component>
                </li>
            </ul>

        <h4 >Unpinned Notes:</h4>
         <ul>
                <li class="clean-list" v-for="note in unpinnedNotes">
                <component :is="note.type" :note="note" @editNoteInfo="editNoteInfo" @deleteNote="deleteNote" @openBcgColor="changeBcgColor" @openTxtColor="changeTxtColor" @tooglePin="tooglePin">
                </component>
                </li>
            </ul>
        <transition name="fade" class="fade-enter-active fade-leave-active fade-enter fade-leave-to">
        <note-edit v-if="editNote" :note="selectedNote" @editNoteInfo="editNoteInfo" @close-edit="closeEdit" @delete-edit="deleteNote" ></note-edit>
        </transition>
        <div class="edit-modal" v-if="editNote"></div>
    </section>
    `,
  data() {
    return {
      editNote: false,
    };
  },
  methods: {
    selected(note) {
      this.$emit("selected", note);
    },
    tooglePin(noteId) {
      this.$emit("tooglePin", noteId);
      // console.log(this.note.id);
    },
    closeEdit() {
      this.editNote = false;
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
    editNoteInfo(note) {
      (this.selectedNote = note), (this.editNote = true);
      // console.log(note);
    },
  },
  computed: {
    pinnedNotes() {
      var notes = this.notes;
      console.log(this.notes);
      if (this.filterType === "all")
        return notes.filter((note) => note.isPinned === true);
      else
        return notes.filter(
          (note) => note.isPinned === true && note.type === this.filterType
        );
    },
    unpinnedNotes() {
      var notes = this.notes;
      // console.log("yes", notes);
      if (this.filterType === "all")
        return console.log("filterType;", filterType);
      //   return this.notes.filter((note) => {
      //     note.isPinned === true;
      //     console.log(filterType);
      //   });
      // else
      //   return notes.filter(
      //     (note) => note.isPinned === true && note.type === this.filterType
      //   );
    },
    pinnedOn() {
      if (this.pinnedNotes.length === 0) return false;
      else return true;
    },
  },
  components: {
    noteImg,
    noteTxt,
    noteVideo,
    noteTodos,
    noteEdit,
    noteMap,
  },
};
