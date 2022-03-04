import homePage from './views/home-page.cmp.js'
import emailApp from './apps/misterEmail/views/email-app.cmp.js'
import keepApp from './apps/missKeep/views/keep-app.cmp.js'
import emailCompose from './apps/misterEmail/views/email-compose.cmp.js'
import emailInbox from './apps/misterEmail/cmps/email-inbox.cmp.js'
import emailSent from './apps/misterEmail/cmps/email-sent.cmp.js'
import emailDraft from './apps/misterEmail/cmps/email-draft.cmp.js'
import emailTrash from './apps/misterEmail/cmps/email-trash.cmp.js'
import emailEdit from './apps/misterEmail/views/email-edit.cmp.js'
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
        children: [
            {
                path: 'compose',
                component: emailCompose,
            },
            {
                path: 'inbox',
                component: emailInbox,
                props:true
            },
            {
                path: 'sent',
                component: emailSent,
                props:true
            },
            {
                path: 'trash',
                component: emailTrash,
                props:true
            },
            {
                path: 'draft',
                component: emailDraft
            },
            {
                path: 'email/:emailId',
                component: emailEdit
            },
            
        ]
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