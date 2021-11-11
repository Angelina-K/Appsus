export default {
  props: ["note"],
  template: `
        <section class="note-edit" :style="{ color: note.style.txtColor, backgroundColor: note.style.bcgColor }">
        <section class="txt-area">
            <input type="text" :style="{ color: note.style.txtColor, backgroundColor: note.style.bcgColor }" v-model="noteTitle">
            <textarea :style="{  color: note.style.txtColor, backgroundColor: note.style.bcgColor  }" v-model="noteBody"></textarea>
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
      noteTitle: "",
      noteBody: "",
    };
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
      var noteInfo = {};
      if (this.note.type === "note-txt") {
        noteInfo = {
          titleTxt: this.noteTitle,
          bodyTxt: this.noteBody,
        };
      } else if (this.note.type === "note-todos") {
        var todos = this.noteBody.split(",");
        todos = todos.map((todo) => {
          var todo = {
            todo: todo.trim(),
            isDone: false,
          };
          return todo;
        });
        noteInfo = {
          titleTxt: this.noteTitle,
          todos: todos,
        };
      } else if (this.note.type === "note-map") {
        noteInfo = {
          titleTxt: this.noteTitle,
          location: this.noteBody,
        };
      } else if (
        this.note.type === "note-img" ||
        "note-video" ||
        "note-audio"
      ) {
        noteInfo = {
          titleTxt: this.noteTitle,
          url: this.noteBody,
        };
      }
      this.$emit("save-changes", noteInfo, this.note.id);
      this.closeEdit();
    },
  },
  created() {
    this.noteTitle = this.note.info.titleTxt;
    switch (this.note.type) {
      case "note-txt":
        this.noteBody = this.note.info.bodyTxt;
        break;
      case "note-img":
        this.noteBody = this.note.info.url;
        break;
      case "note-video":
        this.noteBody = this.note.info.url;
        break;
      case "note-audio":
        this.noteBody = this.note.info.url;
        break;
      case "note-todos":
        var todos = this.note.info.todos.map((todo) => todo.todo);
        todos = todos.join();
        this.noteBody = todos;
        break;
      case "note-map":
        this.noteBody = this.note.info.location;
        break;
    }
  },
};
