import longText from "../services/long-text.cmps.js";

export default {
  name: "note-todos",
  props: ["note"],
  template: `
           <section class="note-display" :style="{color: txtColor, backgroundColor: bcgColor}">
               <div class="note-header">
               {{note.info.titleTxt}}
              </div>
               <div class="note-options">
                <button title="Pin note" @click="tooglePin" :class="{'pinned': note.isPinned}"><i class="fas fa-thumbtack fa-lg edit-btn"></i></button>
                <button title="Edit note" @click="editNoteInfo"><i class="fas fa-edit fa-lg edit-btn"></i></i></button>
                <button title="Change text color" @click="openTxtColor">
                  <input ref="txtColor" type="color" hidden v-model="txtColor" @change="changeTxtColor"><i class="fas fa-paint-brush fa-lg edit-btn"></i></button>
                <button title="Change color" @click="openBcgColor">
                  <input ref="fillColor" type="color" hidden v-model="bcgColor" @change="changeBcgColor"><i class="fas fa-palette fa-lg edit-btn"></i></button>
                  <button title="Delete note" @click="deleteNote"><i class="fas fa-trash-alt fa-lg edit-btn"></i></button>
            </div>
           <ul class="todo-list">
             <li v-for="todo in note.info.todos">
             <long-text :text="todo.todo" :length="20"></long-text>
             </li>
           </ul>
           
            
          </section>`,

  data() {
    return {
      txtColor: this.note.style.txtColor,
      bcgColor: this.note.style.bcgColor,
    };
  },
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
      console.log(this.note.id);
    },
  },
  components: {
    longText,
  },
};
