export default {
  name: "note-text",
  template: `
         <section>
           <label>
             {{info.label}}
             <input v-model="val" type="text" @change="reportVal" placeholder="">
            </label>
        </section>`,
  props: ["info"],
  data() {
    return {
      val,
    };
  },
  methods: {
    reportVal() {
      this.$emit("setVal", this.val);
    },
  },
};
