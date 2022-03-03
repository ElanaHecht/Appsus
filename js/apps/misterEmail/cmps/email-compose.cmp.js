import { emailService } from '../services/email-service.js'

export default {
   template: `
      <section class="email-compose app-layout main-layout">
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
         <button @click="goBack" class="email-back">🗑️</button>
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
         emailService.save(this.emailToAdd)
            .then(email => {
               console.log(email);
               //   eventBus.emit('show-msg', { txt: 'Sent successfully', type: 'success' })
               //   this.$router.push('/email')
            });
      },
      goBack() {
         this.$emit('back')
      }
   }
}