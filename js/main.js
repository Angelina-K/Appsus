import appHeader from "./general-cmps/app-header.cmp.js";
import appFooter from "./general-cmps/app-footer.cmp.js";
import userMsg from "./general-cmps/user-msg.cmp.js";
import { router } from "./routes.js";

const options = {
  el: "#app",
  router,
  template: `
        <section>
            <user-msg />
            <app-header />
            <keep-alive>
                <router-view />
            </keep-alive>
            <app-footer />
        </section>
    `,
  components: {
    appHeader,
    appFooter,
    userMsg,
  },
};

new Vue(options);
