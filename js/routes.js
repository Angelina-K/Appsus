import homePage from "./pages/home-page.cmp.js";
import aboutPage from "./pages/about-page.cmp.js";
import mailApp from "./apps/mail-app/pages/mail-app.cmp.js";
import keepApp from "./apps/keep-app/pages/keep-app.cmp.js";
import mailDetails from "./apps/mail-app/pages/mail-details.cmp.js";
const routes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/mail",
    component: mailApp,
  },
  {
    path: "/mail/:mailId",
    component: mailDetails,
  },
  {
    path: "/keep",
    component: keepApp,
  },
  {
    path: "/about",
    component: aboutPage,
  },
];

export const router = new VueRouter({ routes });
