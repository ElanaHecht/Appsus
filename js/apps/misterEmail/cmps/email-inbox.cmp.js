import { emailService } from '../services/email-service.js';
import { storageService } from '../../../services/async-storage-service.js';
import { eventBus } from '../../../services/eventBus-service.js';
import emailPreview from './email-preview.cmp.js'

export default {
   // props: ['filterBy'],
   template: `
            <section class="email-list">
               <div class="header">
                  <h1>Primary</h1>
               </div>
               <h1 v-if="!emails">You don't have any emails...</h1>
               <ul class="list-container wrap">
                  <li v-for="email in emails" :key="email.id">
               <email-preview :email="email" />
                  </li>
               </ul>
            </section>
   `,
   components: {
      emailPreview,
   },
   data() {
      return {
         emails: null,
         unreadCount: 0,
      }
   },
   created() {
      emailService.query()
      .then(emails => { this.emails = emails.filter( email => email.criteria.status === 'inbox')})
   },

}
