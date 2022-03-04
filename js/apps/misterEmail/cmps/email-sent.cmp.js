import { emailService } from '../services/email-service.js';
import { storageService } from '../../../services/async-storage-service.js';

import { eventBus } from '../../../services/eventBus-service.js';
import emailPreview from './email-preview.cmp.js'

export default {
   template: `
            <section class="email-list">
               <h1 v-if="!emails">You don't have any emails...</h1>
               <ul>
                  <li v-for="email in emails" :key="email.id"  @click="select(email.id)">
               <email-preview :email="email" @remove="remove()" @setRead="setRead"/>
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
         folder: null
      }
   },
   created() {
      emailService.query()
      .then(emails => {
         this.emails = emails.filter( email => email.criteria.status === 'sent')
      });
   },
   methods: {
      remove(id, email) {
         const idx = this.emails.findIndex((email) => email.id === id);
         this.emails.splice(idx, 1)
         email.criteria.status = 'trash';
         storageService.push('STORAGE_KEY', email)
     },
   }
}
