export default {
   template:`
       <header class="main-header">
           <div class="header-container main-layout flex align-items space">
               <div class="logo">
                   <h3>APPSUS 🐎</h3>
                </div>
                <nav class="nav-bar">
                    <router-link to="/">Home</router-link>
                    <!-- <router-link to="/book">Books</router-link> -->
                    <router-link to="/keeper">Keeper</router-link>
                    <router-link to="/email">eMail</router-link>
                </nav>
            </div>
       </header>
   
   `
}