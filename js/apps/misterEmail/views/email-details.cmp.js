// import { eventBus } from '../../../services/eventBus-service.js';
// import { emailService } from '../services/email-service.js';

export default {
   props: ['email'],
   template: `
            <section class="email-details">
               <div class="email-header">
                  <div>{{email.subject}}</div>
                  <div>
                     <h2>{{email.name}}</h2>
                     <p>{{email.address}}</p>
                  </div>
               </div>
                  <div class="body">{{email.body}}</div>
                  <div>
                  <router-link to="/email/edit">Full view</router-link>
                  </div>
            </section>
   `,
      
}