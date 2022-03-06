import { eventBus } from '../../../services/eventBus-service.js';
import { emailService } from '../services/email-service.js'

export default {
   props: ['email', 'sent'],
   template: `
            <section class="email-preview" :class="readStyle" @click="isSelected = !isSelected" @mouseover="isHover = true" @mouseleave="isHover = false">
            <div class="preview-container flex wrap">
               <h4 class="email-name">{{email.name}}</h4>
               <h4 class="email-subject">{{email.subject}} <span class="email-body">{{formatBody}}</span></h4>
               <h1 class="email-time" v-if="!isHover">{{formatTime}}</h1>
               <div v-else class="list-btn">
                  <button class="btn-edit" @click="moveToTrash()" title="Send to trash">🗑️</button>
                  <button class="btn-edit" @click="markRead(email)" title="Read/Unread">{{envelope}}</button>
               </div>
            </div>

            <div v-if="isSelected" class="email-details">
               <div class="email-header">
                  <h2>{{email.subject}}</h2>
                  <div>
                     <h4>{{email.name}} <span class="email-body">{{formatAddress}}</span></h4>
                  </div>
               </div>
                  <div class="body">{{email.body}}</div>
                  <div>
                  <!-- <router-link>Full view</router-link> -->
                  <!-- <router-link :to="'email/'+email.id">Full view</router-link> -->
                  </div>
            </div>
            </section>
   `,
   data() {
      return {
         isHover: false,
         isSelected: false,
         isEmailRead: false,
      }
   },
   methods: {
      moveToTrash() {
         if (this.email.criteria.status = 'trash') {
            emailService.remove(this.email.id)
            emailService.query()
            .then(emails => { this.emails = emails.filter( email => email.criteria.status === 'trash')});
         } else {
            this.email.criteria.status = 'trash';
            emailService.edit(this.email)
         }
      },   
      markRead(email) {
         this.isSelected = true;
        if (this.isEmailRead) {
           email.criteria.isRead = true;
           this.isEmailRead = false
        } else {
         email.criteria.isRead = false;
         this.isEmailRead = true;
        }
         return emailService.edit(email)
      },
      expand() {
         this.isExpanded = !this.isExpanded;
      }
   },
   computed: {
      formatBody() {
         const body = this.email.body.slice(0, 50);
         return `- ${body}...`
      },
      formatTime() {
         const date = new Date(this.email.sentAt)
         return `${date.getDate()}/${date.getMonth() + 1}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}0`
      },
      formatAddress(){
return `<${this.email.address}>`
      },
      readStyle() {
         return { selected: this.isSelected, read: this.isEmailRead }
      },
      envelope(){
         if(this.isEmailRead) return '📩'
         else return '✉️'
      }
   }
}