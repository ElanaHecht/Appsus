
import { emailService } from '../services/email-service.js';

import emailPreview from './email-preview.cmp.js'

export default {
   template: `
            <section class="email-list">
               <h1 v-if="!emails">You don't have any emails...</h1>
               <ul>
                  <li v-for="email in emails" :key="email.id"  >
               <email-preview v-if="isSelected" :email="email" @remove="removeEmail" @setRead="setRead"/>
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
         isSelected: false
      }
   },
   created() {
      this.folder = this.$router.name
      console.log(this.folder);
      emailService.query()
         .then(emails => {
            this.emails = emails.filter( email => email.criteria.status === this.folder)
         });
   },
   methods: {
      removeEmail(id, email) {
         this.$emit('remove', id, email)
      },
      setRead(email) {
         this.$emit('setRead', email)
      },
   }
}
