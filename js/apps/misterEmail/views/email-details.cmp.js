// import { eventBus } from '../../../services/eventBus-service.js';
import { emailService } from '../services/email-service.js';


export default {
   props: ['email'],
   template: `
            <section v-if="email" class="email-details">
               <div class="email-header">
                  <div>{{email.subject}}</div>
                  <div>
                     <h2>{{email.name}}</h2>
                     <p>{{email.address}}</p>
                  </div>
               </div>
                  <div class="body">{{email.body}}</div>
                  <div>
                     <button>⏹️</button>
                     <!-- <router-link to="/email">Back</router-link> -->
                  </div>
            </section>
   `,
         data() {
            return {
                email: null
            };
        },
        created() {
            const id = this.$route.params.emailId;
            emailService.get(id)
                .then(email => this.email = email);
        },
}