import { eventBus } from '../../../services/eventBus-service.js';

export default {
   props: ['email'],
   template: `
            <section class="email-preview" :class="readStyle" @click="isExpanded = !isExpanded" @mouseover="isHover = true" @mouseleave="isHover = false">
               <h1>{{email.name}}</h1>
               <h1>{{email.subject}}</h1>
               <p>{{formatBody}}</p>
               <p v-if="!isHover">{{formatTime}}</p>
               <div v-else><button @click="remove(email.id, email)">🗑️</button><button @click="markRead(email)">✉️</button></div>
                  <div class="expand-email" v-if="isExpanded">
                     <button @click="fullText">📖</button>
                     <h2>{{email.subject}}</h2>
                     <h3>{{email.name}}</h3><h1>{{email.address}}</h1>
                     <p>{{email.body}}</p>

               </div>
            </section>
   `,
   data() {
      return {
         isHover: false,
         isEmailRead: false,
         isExpanded: false,
      }
   },
   methods: {
      remove(id, email) {
         this.emit('remove', id, email);
      },
      markRead(email) {
         if (!this.isEmailRead) {
            email.criteria.isRead = true;
            this.isEmailRead = true;
         } else {
            email.criteria.isRead = false;
            this.isEmailRead = false;
         }
         this.$emit('setRead', email)
      },
      fullText(){

      }
   },
   computed: {
      formatBody() {
const body = this.email.body.slice(0, 75);
return `${body}...`
      },
      formatTime() {
         const date = new Date(this.email.sentAt)
         return `${date.getDate()}/${date.getMonth() + 1}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
      },
      readStyle() {
         return { read: this.isEmailRead }
      }
   }
}