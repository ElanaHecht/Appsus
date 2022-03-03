import { eventBus } from '../../../services/eventBus-service.js';
import emailDetails from '../views/email-details.cmp.js';

export default {
   props: ['email'],
   template: `
            <section class="email-preview" @click="expand" :class="readStyle" @mouseover="isHover = true" @mouseleave="isHover = false">
               <div class="preview-container flex">
               <span class="email-name">{{email.name}}</span>
               <span class="email-subject">{{email.subject}} <span class="email-body">{{formatBody}}</span></span>
               <span class="email-time" v-if="!isHover">{{formatTime}}</span>
               <span v-else><button @click="remove(email.id, email)">🗑️</button><button @click="markRead(email)">✉️</button></span>
            </div>
               <email-details v-if="isExpanded" :email="email" />
            </section>
   `,
   components: {
      emailDetails,
   },
   data() {
      return {
         isHover: false,
         isEmailRead: false,
         isExpanded: false,
      }
   },
   methods: {
      remove(id, email) {
         this.$emit('remove', id, email);
      },
      markRead(email) {
         if (!this.isEmailRead) {
            email.criteria.isRead = true;
            this.isEmailRead = true;
         } else {
            email.criteria.isRead = false;
            this.isEmailRead = false;
         }
         eventBus.emit('markRead', email)
      },
      expand() {
         this.isExpanded = !this.isExpanded;
      }
   },
   computed: {
      formatBody() {
         const body = this.email.body.slice(0, 50);
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