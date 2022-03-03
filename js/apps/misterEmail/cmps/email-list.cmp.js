// import { emailService } from '../services/email-service.js';
// import { eventBus } from '../../../services/eventBus-service.js';
import emailPreview from './email-preview.cmp.js'

export default {
   props: ['emails'],
   template: `
            <section class="email-list">
               <h1 v-if="!emails">You don't have any emails...</h1>
               <ul>
                  <li v-for="email in emails" :key="email.id">
               <email-preview :email="email" @remove="removeEmail"/>
                  </li>
               </ul>
            </section>
   `,
   components: {
      emailPreview,
   },
   methods: {
      removeEmail(id, email) {
         const idx = this.emails.findIndex((email) => email.id === id);
         email.criteria.status = 'trash';
         this.emails.splice(idx, 1)
      }
   }
}
