export default {
  name: "note-img",
  props: ["noteImg"],
  template: `
         <div class="note-img" :style="{ color: textColor, backgroundColor: bcgColor }">

          `,
  data() {
    return {
      add: "",
    };
  },
};
