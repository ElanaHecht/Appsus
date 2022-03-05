import { eventBus } from '../../../services/eventBus-service.js';

export default {
   props: ['email'],
   template: `
            <section class="email-preview" :class="readStyle" @click="isSelected = !isSelected" @mouseover="isHover = true" @mouseleave="isHover = false">
               <div class="preview-container flex wrap">
               <h4 class="email-name">{{email.name}}</h4>
               <h4 class="email-subject">{{email.subject}} <span class="email-body">{{formatBody}}</span></h4>
               <h1 class="email-time" v-if="!isHover">{{formatTime}}</h1>
               <div v-else class="list-btn"><button class="btn-edit" @click="remove(email.id, email)">🗑️</button><button class="btn-edit" @click="markRead(email.id, email)">✉️</button></div>
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
                  <router-link :to="'email/'+email.id">Full view</router-link>
                  </div>
            </div>
            </section>
   `,
   data() {
      return {
         isHover: false,
         isSelected: false,
      }
   },
   methods: {
      remove(id, email) {
         eventBus.emit('remove', id, email);
      },
      markRead(id, email) {
         email.criteria.isRead = !this.isEmailRead
         this.isEmailRead = email.criteria.isRead
         this.$emit('markRead', email)
         return storageService.put('STORAGE_KEY', {id, email})
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
         return { read: this.isSelected }
      }
   }
}