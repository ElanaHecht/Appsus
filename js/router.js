import homePage from './views/home-page.cmp.js'
import emailApp from './apps/misterEmail/views/email-app.cmp.js'
import keepApp from './apps/missKeep/views/keep-app.cmp.js'
import emailDetails from './apps/misterEmail/views/email-details.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/keeper',
        component: keepApp
    },
    {
        path: '/email',
        component: emailApp,
    },
    {
        path: '/email/:emailId',
        component: emailDetails
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