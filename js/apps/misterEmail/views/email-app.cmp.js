import { emailService } from '../services/email-service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailCompose from './email-compose.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
    template: `
       <section class="email-app app-layout main-layout">
               <email-filter @filtered="setFilter"/>
            <div class="email-container">
            <div class="side-bar">
            <router-link class="compose-btn btn" :to="'/email/compose'">Compose</router-link>
               <email-folder-list :emails="emails" @setFolder="setFolder"/>
            </div>
               <email-list :emails="emailsForDisplay" />
            </div>
       </section>
   `,
    components: {
        emailFilter,
        emailCompose,
        emailFolderList,
        emailList,
    },
    data() {
        return {
            emails: null,
            filterBy: null,
            folder: 'inbox',
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
            });
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        setFolder(folder) {
            this.folder = folder;
        }
    },
    computed: {
        emailsForDisplay() {
            if (!this.filterBy) return this.emails;
            let selected = this.filterBy.inputSelect;
            let byRead = null;
            switch (selected) {
                case 'READ':
                    byRead = this.emails.filter(email => email.criteria.isRead)
                    break;
                case 'UNREAD':
                    byRead = this.emails.filter(email => !email.criteria.isRead)
                    break;
                case 'ALL':
                    byRead = this.emails
                    break;
            }
            let byFolder = null;
            switch (this.folder) {
                case 'Inbox':
                    byFolder = this.emails.filter(email => email.criteria.status = 'inbox')
                    break;
                case 'Sent':
                    byFolder = this.emails.filter(email => email.criteria.status = 'sent')
                    break;
                case 'Trash':
                    byFolder = this.emails.filter(email => email.criteria.status = 'trash')
                    break;
                case 'Draft':
                    byFolder = this.emails.filter(email => email.criteria.status = 'draft')
                    break;
            }
            const regex = new RegExp(this.filterBy.inputSearch, 'i');
            return byFolder.filter(email => regex.test(email.criteria.txt))
        }
    }
}