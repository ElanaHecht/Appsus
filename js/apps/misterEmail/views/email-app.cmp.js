import { emailService } from '../services/email-service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'

export default {
    template: `
       <section class="email-app app-layout main-layout">
               <email-filter @filtered="setFilter"/>
            <div class="email-container">
            <div class="side-bar">
                <button class="compose-btn btn" @click="isList = false" >Compose</button>
                <email-folder-list :emails="emails" @setFolder="setFolder"/>
            </div>
                <email-compose v-if="!isList" @back="isList = true"/>
                <email-list v-else :emails="emailsForDisplay" />
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
            isList: true,
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
        },
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