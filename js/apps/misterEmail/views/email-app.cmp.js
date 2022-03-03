import { eventBus } from '../../../services/eventBus-service.js';
import { emailService } from '../services/email-service.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailCompose from '../views/email-compose.cmp.js';
import emailEdit from '../views/email-edit.cmp.js';

export default {
    template: `
       <section class="email-app app-layout main-layout">
               <email-filter @filtered="setFilter"/>
            <div class="email-container">
            <div class="side-bar">
                <button class="compose-btn btn" @click="isList = !isList" >Compose</button>
                <email-folder-list :emails="emails" @setFolder="setFolder"/>
            </div>
                <email-compose v-if="!isList" @back="isList = true" @save="save"/>
                <email-list v-else :emails="emailsForDisplay" @selected="selectEmail" @remove="remove" />
                <email-edit v-if="fullEmail" :email="fullEmail"/>
            </div>
       </section>
   `,
    components: {
        emailFilter,
        emailCompose,
        emailFolderList,
        emailList,
        emailEdit,
    },
    data() {
        return {
            fullEmail: null,
            emails: null,
            filterBy: null,
            folder: 'inbox',
            isList: true,
            openDetails: false
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
            });
        this.unsubscribe = eventBus.on('fullViewEmail', this.email);
        this.unsubscribe = eventBus.on('markRead',this.email);
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        setFolder(folder) {
            this.folder = folder;
        },
        selectEmail(id) {
            const email = this.emails.find((email => email.id === id))
            if (email.criteria.isRead) email.criteria.isRead = false;
            else email.criteria.isRead = true;
            emailService.save(email)
                .then(email => {
                    console.log(email);
                });
        },
        setRead(email) {
            emailService.save(email)
                .then(email => {
                    console.log(email);
                });
        },
        remove(id, email) {
            const idx = this.emails.findIndex((email) => email.id === id);
            this.emails.splice(idx, 1)
            email.criteria.status = 'trash';
            emailService.save(email)
                .then(email => {
                    console.log(email);
                });
        },
        save(email) {
            emailService.save(email)
                .then(email => {
                    this.isList = true;
                    console.log(email);
                })
        },
        fullViewEmail(email) {
            console.log('email!');
            this.fullEmail = email;
        }
    },
    computed: {
progressPercent(){
return '20%'
},
        emailsForDisplay() {
            if (!this.filterBy) return this.emails;
            let selected = this.filterBy.inputSelect;
            let byRead = null;
            switch (selected) {
                case 'READ':
                    if (this.unRead > 0) return this.unRead--;
                    break;
                case 'UNREAD':
                    byRead = this.emails.filter(email => !email.criteria.isRead)
                    break;
                case 'ALL':
                    byRead = this.emails
                    break;
            }
            // let byFolder = null;
            // switch (this.folder) {
            //     case 'Inbox':
            //         byFolder = this.emails.filter(email => email.criteria.status = 'inbox')
            //         break;
            //     case 'Sent':
            //         byFolder = this.emails.filter(email => email.criteria.status = 'sent')
            //         break;
            //     case 'Trash':
            //         byFolder = this.emails.filter(email => email.criteria.status = 'trash')
            //         break;
            //     case 'Draft':
            //         byFolder = this.emails.filter(email => email.criteria.status = 'draft')
            //         break;
            // }
            const regex = new RegExp(this.filterBy.inputSearch, 'i');
            return byRead.filter(email => regex.test(email.criteria.txt))
        }
    },
    unmounted() {
        this.unsubscribe();
    }
}