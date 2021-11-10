import { eventBus } from "../../../services/event-bus-service.js";
import { utilService } from "../../../services/util-service.js";
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

              <h3> My Notes</h3>
              <section class="notes-containers">
                <div class="note-containers" v-for="note in notes">
                  <note-img :note="note" @deleteNote="deleteNote" @tooglePin="tooglePin" @changeBcgColor="changeBcgColor"/>
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
    tooglePin(noteId) {
      console.log(noteId);
      noteService.tooglePin(noteId);
    },

    editNote() {},
    changeTxtColor() {},

    changeBcgColor(bcgColor, noteId) {
      utilService.changeBcgColor(bcgColor, noteId);
    },

    deleteNote(noteId) {
      noteService
        .deleteNote(noteId)
        .then(() => {
          const msg = {
            txt: "Deleted Successfully",
            type: "success",
          };
          eventBus.$emit("showMsg", msg);
          this.loadNotes();
        })
        .catch((err) => {
          console.log("err", err);
          const msg = {
            txt: "Error. Please try later",
            type: "error",
          };
          eventBus.$emit("showMsg", msg);
        });
    },
  },

  components: {
    noteAdd,
    noteImg,
    noteService,
  },
};
