import noteImg from "./note-img.cmps.js";
import noteTxt from "./note-txt.cmps.js";
import noteVideo from "./note-video.cmps.js";
import noteTodos from "./note-todos.cmps.js";
import noteEdit from "./note-edit.cmps.js";

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
        <transition name="fade" class="fade-enter-active fade-leave-active fade-enter fade-leave-to">
        <note-edit v-if="editNote" :note="selectedNote" @close-edit="closeEdit" @delete-edit="deleteNote" @saveChanges="changeInfo"></note-edit>
        </transition>
        <div class="edit-modal" v-if="editNote"></div>
    </section>
    `,
  data() {
    return {
      editNote: false,
      selectedNote: {},
    };
  },
  methods: {
    tooglePin() {
      this.$emit("tooglePin", this.note.id);
      console.log(this.note.id);
    },
    editNoteInfo(note) {
      (this.selectedNote = note), (this.editNote = true);
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
    changeInfo(noteInfo, noteId) {
      this.$emit("changeInfo", noteInfo, noteId);
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
    noteEdit,
  },
};
