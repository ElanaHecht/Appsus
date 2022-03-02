import { emailService } from '../services/email-service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
    template: `
       <section class="email-app app-layout main-layout">
              <email-filter />
              <email-compose />
              <email-folder-list />
              <email-list :emails="emailsForDisplay" />
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
        }
    },
    computed: {
        emailsForDisplay() {
            if (!this.filterBy) return this.emails;
            const regex = new RegExp(this.filterBy.txt, 'i');
            return this.emails.filter(email => regex.test(email.txt));
        }
    }
}