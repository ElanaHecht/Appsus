import { emailService } from '../services/email-service.js'
import emailFilter from '../cmps/email-filter.cmp.js'

export default {
   template:`
       <section class="email-app app-layout main-layout">
              <email-filter /> 
       </section>
   `,
    components: {
        emailFilter,
    },
    data(){
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