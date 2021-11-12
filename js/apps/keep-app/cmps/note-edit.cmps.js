import { noteService } from "../services/note-service.cmps.js";

export default {
  name: "note-edit",
  props: ["note"],
  template: `
        <section class="note-edit" :style="{color: note.style.txtColor, backgroundColor: note.style.bcgColor}">
        <section v-if="noteToEdit" class="txt-area">
            <input type="text" :style="{color: note.style.txtColor, backgroundColor: note.style.bcgColor}" v-model="noteToEdit.info.titleTxt">
            <textarea :style="{color: note.style.txtColor, backgroundColor: note.style.bcgColor}" v-model="noteToEdit.info.bodyTxt"></textarea>
        </section>
        <section class="btn-area">
            <button class="edit-btn" @click="saveChanges">Save</button>
            <button class="edit-btn" @click="deleteNote">Delete</button>
            <button class="edit-btn" @click="closeEdit">Back</button>
        </section>
    </section>
    `,
  data() {
    return {
      noteToEdit: null,
    };
  },
  created() {
    noteService.getById(this.note.id).then((note) => {
      console.log(this.note.id);
      this.noteToEdit = note;
      console.log(this.noteToEdit);
    });
  },
  methods: {
    closeEdit() {
      this.$emit("close-edit");
    },
    deleteNote() {
      this.$emit("delete-edit", this.note.id);
      this.closeEdit();
    },
    saveChanges() {
      noteService.save(this.noteToEdit);
      this.closeEdit();
    },
  },
};
