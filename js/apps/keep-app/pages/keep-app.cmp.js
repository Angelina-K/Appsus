import { eventBus } from "../../../services/event-bus-service.js";
import { utilService } from "../../../services/util-service.js";
import { noteService } from "../services/note-service.cmps.js";
import noteAdd from "../cmps/note-add.cmps.js";
import noteList from "../cmps/note-list.cpms.js";

export default {
  name: "note-app",
  template: `
          <section class="note main-layout ">
              <div class="note-app">
              <h1>Welcome To keep</h1>
              <note-add></note-add>
              <!-- <book-filter @filtered="setFilter"/> -->
              <h3 class="my-notes-handling"> My Notes</h3>
              <section class="notes-containers">
                <div v-for="note in notes">
              <note-list :note="note" @deleteNote="deleteNotes" @tooglePin="tooglePin" @changeBcgColor="changeBcgColor" @changeTxtColor="changeTxtColor" @editNoteInfo="editNoteInfo"/></note-list>
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
    editNoteInfo(noteInfo, noteId) {
      console.log(noteInfo);
      console.log(noteId);
      utilService.changeInfo(noteInfo, noteId);
    },
    changeTxtColor(txtColor, noteId) {
      utilService.changeTxtColor(txtColor, noteId);
    },
    changeBcgColor(bcgColor, noteId) {
      utilService.changeBcgColor(bcgColor, noteId);
    },
    deleteNotes(noteId) {
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
    noteService,
    noteList,
  },
};
