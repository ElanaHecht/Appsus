import { emailService } from '../services/email-service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'
import emailList from '../cmps/email-list.cmp.js'
import emailCompose from '../views/email-compose.cmp.js'

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
                <email-list v-else :emails="emailsForDisplay" @selected="selectEmail" @setRead="setRead" @remove="remove" />
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
        selectEmail(id) {
            const email = this.emails.find((email => email.id === id))
            // this.$router.push('/email/'+ id);
        },
        setRead(email) {
            emailService.save(email)
                .then(email => {
                    console.log(email);
                    //   eventBus.emit('show-msg', { txt: 'trashed successfully', type: 'success' })
                    //   this.$router.push('/email')
                });
        },
        remove(email) {
            const idx = this.emails.findIndex((email) => email.id === id);
            this.emails.splice(idx, 1)
            email.criteria.status = 'trash';
            emailService.save(email)
                .then(email => {
                    console.log(email);
                    //   eventBus.emit('show-msg', { txt: 'trashed successfully', type: 'success' })
                    //   this.$router.push('/email')
                });
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
    }
}