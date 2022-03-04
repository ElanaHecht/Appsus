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
           
            <router-link class="email-compose" to="/email/compose">Compose</router-link>
            <div class="flex column">
            <router-link class="email-folder-list" to="/email/inbox">Inbox</router-link>
            <router-link class="email-folder-list" to="/email/sent">Sent</router-link>
            <router-link class="email-folder-list" to="/email/trash">Trash</router-link>
            <router-link class="email-folder-list" to="/email/draft">Draft</router-link>
            </div>
       
                <!-- <button class="compose-btn btn" @click="isList = !isList" >Compose</button> -->
                <!-- <email-folder-list @setFolder="setFolder"/> -->
            </div>
       
            <router-view class="view"></router-view>

                <!-- <email-compose v-if="!isList" @back="isList = true" @save="save"/>
                <email-list v-else :emails="emailsForDisplay" @selected="selectEmail" @remove="remove" />
                <email-edit v-if="fullEmail" :email="fullEmail"/> -->
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
                console.log(this.emails);
            });
        // this.unsubscribe = eventBus.on('fullViewEmail', this.email);
        // this.unsubscribe = eventBus.on('markRead', this.email);
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        setFolder() {
            this.folder = ev.target.innerText;
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
            emailService.query()
                .then(emails => {
                    this.emails = emails
                    console.log(this.emails);
                });
        },
        save(email) {
            emailService.save(email)
                .then(email => {
                    console.log(email);
                    this.isList = true;
                })
        },
        fullViewEmail(email) {
            console.log('email!');
            this.fullEmail = email;
        }
    },
    computed: {
        emailsForDisplay() {
            if (!this.filterBy) return this.emails;
            const regex = new RegExp(this.filterBy.inputSearch, 'i');
            const selected = this.filterBy.inputSelect
            var a = this.emails.filter(email => (regex.test(email.criteria.txt)))
            var b = a.filter(email => (selected === 'ALL') || ((selected === 'READ') === email.criteria.isRead))
            return b
        }
    },
    unmounted() {
        this.unsubscribe();
    }
}