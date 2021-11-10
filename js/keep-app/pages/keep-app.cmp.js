import keepAdd from "../cmps/keep-add.cmps.js";

export default {
  name: "keep-app",
  template: `
          <section class="keep main-layout ">
              <div class="keep-app">
              <h1>Welcome To keep</h1>
              <keep-add></keep-add>
            </div>
          </section>
              `,

  components: {
    keepAdd,
  },
};
