import { emailService } from '../services/email-service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'

export default {
    template: `
       <section class="email-app app-layout main-layout">
              <email-filter />
              <email-compose />
              <email-folder-list />
       </section>
   `,
    components: {
        emailFilter,
        emailCompose,
        emailFolderList,
    },
    data() {
        return {
            emails: null,
            filterBy: null,
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails);
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
}