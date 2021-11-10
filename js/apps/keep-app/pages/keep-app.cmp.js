import noteAdd from "../cmps/note-add.cmps.js";
import noteImg from "../cmps/note-img.cmps.js";
import { noteService } from "../services/note-service.cmps.js";

export default {
  name: "note-app",
  template: `
          <section class="note main-layout ">
              <div class="note-app">
              <h1>Welcome To keep</h1>
              <note-add></note-add>

              <section>
                <h3> My Notes</h3>
                <div v-for="note in notes">
                  <note-img :note="note" />
                </div>
                
                 </section>

            </div>
          </section>
              `,
  data() {
    return {
      notes: null,
    };
  },
  created() {
    this.loadNotes();
  },
  methods: {
    loadNotes() {
      noteService.query().then((notes) => {
        console.log("app notes", notes);
        this.notes = notes;
      });
    },
    tooglePin(note) {},
    editNote() {},
    changeTxtColor() {},
    changeBcgColor() {},
    deleteNote(noteId) {
      noteService.deleteNote(noteId);
    },
  },

  components: {
    noteAdd,
    noteImg,
    noteService,
  },
};
