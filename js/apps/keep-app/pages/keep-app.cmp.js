import { eventBus } from "../../../services/event-bus-service.js";
import { noteService } from "../services/note-service.cmps.js";
import { storageService } from "../../../services/async-storage-service.js";

import noteAdd from "../cmps/note-add.cmps.js";
import noteFilter from "../cmps/note-filter.cmps.js";
import noteList from "../cmps/note-list.cmps.js";

export default {
  name: "note-app",
  template: `
          <section class="note main-layout ">
              <div class="note-app">
              <h1>Welcome To keep</h1>
              <h3 class="my-notes-handling"> My Notes</h3>
              
              <note-add></note-add>
              <note-filter @filtered="setFilter"></note-filter>

              
              <section class="notes-containers">
              <note-list :notes="notesToShow" @deleteNote="deleteNotes" @tooglePin="tooglePin" @changeBcgColor="changeBcgColor" @changeTxtColor="changeTxtColor" @changeInfo="changeInfo"/></note-list>
                 </section>
            </div>
          </section>
              `,
  data() {
    return {
      notes: null,
      filterBy: null,
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
    changeInfo(noteInfo, noteId) {
      console.log("noteInfo", noteInfo);
      console.log("noteId", noteId);

      noteService.getById(noteId).then((note) => {
        noteService.save(note).then(this.loadNotes);
      });
      // noteService
      //   .save(note)
      //   .then(() => {
      //     const msg = {
      //       txt: "Save Successfully",
      //       type: "success",
      //     };
      //     eventBus.$emit("showMsg", msg);
      //     this.loadNotes();
      //   })
      //   .catch((err) => {
      //     console.log("err", err);
      //     const msg = {
      //       txt: "Error. Please try later",
      //       type: "error",
      //     };
      //     eventBus.$emit("showMsg", msg);
      //   });
    },
    changeTxtColor(txtColor, noteId) {
      noteService.changeTxtColor(txtColor, noteId);
    },
    changeBcgColor(bcgColor, noteId) {
      noteService.changeBcgColor(bcgColor, noteId);
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
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    notesToShow() {
      if (!this.filterBy) return this.notes;
      console.log(this.notes);

      const searchStr = this.filterBy.titleTxt.toLowerCase();
      const Type = this.filterBy.type ? this.filterBy.type : "All";

      const filterNotes = this.nots.filter((note) => {
        return (
          note.title.toLowerCase().includes(searchStr) && note.filterBy.type
        );
      });
      console.log(filterNotes);

      return filterNotes;
    },
  },

  components: {
    noteAdd,
    noteService,
    noteList,
    noteFilter,
  },
};
