export default {
  name: "note-img",
  props: ["note"],
  template: `
       <section>
         <div class="note-header">
           {{note.info.titleTxt}}
           <div class="note-options">
            <button title="Pin note" @click="tooglePin" :class="{'pinned': note.isPinned}"><i class="fas fa-thumbtack fa-lg"></i></button>
            <button title="Edit note" @click="editNote"><i class="fas fa-edit fa-lg"></i></i></button>
            <button title="Change text color" @click="openTxtColor">
              <input ref="txtColor" type="color" hidden v-model="txtColor" @change="changeTxtColor"><i class="fas fa-paint-brush fa-lg"></i></button>
            <button title="Change color" @click="openBcgColor">
              <input ref="fillColor" type="color" hidden v-model="bcgColor" @change="changeBcgColor"><i class="fas fa-palette fa-lg"></i></button>
            <button title="Delete note" @click="deleteNote"><i class="fas fa-trash-alt fa-lg"></i></button>
          </div>
        </div>
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
    },
    editNote() {
      this.$emit("editNote", this.note.id);
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
    },
  },
};
