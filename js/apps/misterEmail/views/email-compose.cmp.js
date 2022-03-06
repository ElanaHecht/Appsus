import { emailService } from '../services/email-service.js'
import { utilService } from '../../../services/util-service.js'
import { eventBus } from '../../../services/eventBus-service.js';

export default {
   template: `
      <section class="email-compose main-layout">
         <form @submit.prevent="save" class="flex column">
            <div class="input-label">To
            <input type="text" v-model="emailToAdd.address" />
            </div>
            <div  class="input-label">Subject
            <input type="text" v-model="emailToAdd.subject" />
            </div>
            <textarea v-model="emailToAdd.body"></textarea>
            <button class="email-send" title="Send email">📨</button>
         </form>
         <button @click="goBack" class="email-back" title="Discard">🗑️</button>
      </section>
   `,
   data() {
      return {
         emailToAdd: emailService.getEmptyEmail(),
      }
   },
   methods: {
      save() {
         this.emailToAdd.criteria.status = 'sent';
         this.emailToAdd.criteria.txt = `${this.emailToAdd.name}${this.emailToAdd.subject}${this.emailToAdd.body}`
         emailService.save(this.emailToAdd);
           this.$router.push('/email/inbox')
      },
   goBack() {
      this.$router.push('/email/inbox')
   }

}
}
