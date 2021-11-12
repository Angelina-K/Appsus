import { eventBus } from "../../../services/event-bus-service.js";

export default {
  name: "note-add",
  props: ["noteAdd"],
  template: `
  <section class="note-add">
        <div class="control-area">
            <button @click="setType('note-txt')" title="Text note"><i class="fas fa-font fa-2x"></i></button>
            <button @click="setType('note-img')" title="Image note"><i class="far fa-image fa-2x"></i></button>
            <button @click="setType('note-video')" title="Video note"><i class="fab fa-youtube fa-2x"></i></button>
            <button @click="setType('note-todos')" title="List note"><i class="fas fa-list fa-2x"></i></button>
            <button @click="addNote" class="add-btn" title="Add note"><i class="fas fa-plus fa-2x"></i></button>
        </div>
    </section>
        `,
  data() {
    return {
      noteType: "note-txt",
      noteTitle: "",
      noteBody: "",
      note: { type: "", info: {} },
      isOn: false,
    };
  },
  methods: {
    setType() {},
    addNote() {},
  },
};
