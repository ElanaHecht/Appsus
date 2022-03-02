import { router } from './router.js';
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'

const options = {
   template: `
       <section>
          <!-- <h1>{{hello}}</h1> -->
           <app-header />
           <user-msg />
           <router-view />
           <app-footer />
       </section>
   `,
   data(){
      return {
         hello: 'hi there',
      }
   },
   components: {
       appHeader,
       appFooter,
       userMsg,
   }
};


const app = Vue.createApp(options);
app.use(router);
app.mount('#app');