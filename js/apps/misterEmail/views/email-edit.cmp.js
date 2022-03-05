import { eventBus } from '../../../services/eventBus-service.js';
import { emailService } from '../services/email-service.js';


export default {
   template: `
            <section v-if="emailToRead" class="email-edit">
               <div class="full-header">
                  <div class="email-header">
                     <div>{{email.subject}}</div>
                     <div>
                        <h2>{{email.name}}</h2>
                        <p>{{email.address}}</p>
                     </div>
                  </div>
               </div>
                  <div class="body">{{email.body}}</div>
                  <button @click="remove(emailToRead.id)">🗑️</button>
            </section>
   `,
  data() {
   return {
       emailToRead: emailService.getEmptyEmail(),
   };
},
created() {
   const id = this.$route.params.emailId;
   console.log(id);
   if (id) {
       emailService.get(id)
           .then(email => this.emailToRead = email);
   }
},
methods: {
   finalRemove(id) {
eventBus.emit('finalRemove', id)
   }
},
}