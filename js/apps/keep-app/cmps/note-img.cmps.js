export default {
  name: "note-img",
  template: `
       <section>
         <label>
           {{info.label}}
            <select v-model="val" @change="reportVal">
              <options v-for="opt in info">{{opt}}</options>
            </select>
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
      this.emit("setVal", this.val);
    },
  },
};
