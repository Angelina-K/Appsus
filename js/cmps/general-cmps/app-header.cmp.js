export default {
  name: "app-header",
  template: `
        <header class="header flex main-layout align-center space-between">
            <div class="logo">
                <h3><A>APPSUS</A></h3>
            </div>
            <nav>
                <router-link to="/" active-class="active-link" exact>Home</router-link> |
                <router-link to="/mail">Mail</router-link> |
                <router-link to="/keep">Keep</router-link> |
                <router-link to="/book">Books</router-link> |
                <router-link to="/about">About</router-link> 
            </nav>
        </header>
    `,
};
