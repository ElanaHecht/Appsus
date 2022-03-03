import { eventBus } from '../../../services/eventBus-service.js';


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
                     <button @click="fullView">⏹️</button>
                  </div>
            </section>
   `,
   methods: {
      fullView(){
         eventBus.emit('fullViewEmail', this.email)
      }
   }
}