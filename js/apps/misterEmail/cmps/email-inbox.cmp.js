import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/eventBus-service.js';

import emailPreview from './email-preview.cmp.js'

export default {
   template: `
            <section class="email-list">
               <h1 v-if="!emails">You don't have any emails...</h1>
               <ul>
                  <li v-for="email in emails" :key="email.id"  @click="select(email.id)">
               <email-preview :email="email" @remove="removeEmail" @setRead="setRead"/>
                  </li>
               </ul>
            </section>
   `,
   components: {
      emailPreview,
   },
   data() {
      return {
         emails: null
      }
   },
   created() {
      emailService.query()
         .then(emails => {
            this.emails = emails.filter( email => email.criteria.status === 'inbox')
         });
   },
   methods: {
      removeEmail(id, email) {
         console.log('remove');
         eventBus.emit('remove', id, email)
      },
      setRead(email) {
         eventBus.emit('setRead', email)
      },
      select(id) {
         eventBus.emit('selected', id)
      }
   }
}
