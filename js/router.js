import homePage from './pages/home-page.cmp.js'
import keepApp from './apps/missKeep/pages/keep-app.cmp.js'
import emailApp from './apps/misterEmail/pages/email-app.cmp.js'

const routes = [
       {
           path: '/',
           component: homePage
       },
       {
           path: '/keep',
           component: keepApp
       },
       {
           path: '/email',
           component: emailApp
       },
    //    {
    //        path: '/book',
    //        component: bookApp
    //    },
   ];
   
   export const router = VueRouter.createRouter({
       routes,
       history: VueRouter.createWebHashHistory()
   });