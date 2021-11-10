import noteAdd from "../cmps/note-add.cmps.js";
import noteTxt from "../cmps/note-txt.cmps.js";
import { noteService } from "../services/note-service.cmps.js";

export default {
  name: "note-app",
  template: `
          <section class="note main-layout ">
              <div class="note-app">
              <h1>Welcome To keep</h1>
              <note-add ></note-add>

              <section>
              <h3>My Notes</h3>
              <ul>
                <li>
                </li>
              </ul>
              {{notes}}
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
  },

  components: {
    noteAdd,
    noteTxt,
    noteService,
  },
};
