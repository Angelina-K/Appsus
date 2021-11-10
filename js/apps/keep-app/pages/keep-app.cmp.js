import noteAdd from "../cmps/note-add.cmps.js";

export default {
  name: "note-app",
  template: `
          <section class="note main-layout ">
              <div class="note-app">
              <h1>Welcome To keep</h1>
              <note-add></note-add>
            </div>
          </section>
              `,

  components: {
    noteAdd,
  },
};
