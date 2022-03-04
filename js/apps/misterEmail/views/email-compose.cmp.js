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
            <button class="email-send">Send</button>
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
         if (!this.emailToAdd.id) this.emailToAdd.id = utilService.makeId();
         this.emailToAdd.criteria.status = 'sent';
         this.emailToAdd.criteria.txt = `${this.emailToAdd.name}${this.emailToAdd.subject}${this.emailToAdd.body}`
         eventBus.emit('save', this.emailToAdd)
         //   eventBus.emit('show-msg', { txt: 'Sent successfully', type: 'success' })
           this.$router.push('/email/inbox')
      },
   goBack() {
      eventBus.emit('back')
   }

}
}
