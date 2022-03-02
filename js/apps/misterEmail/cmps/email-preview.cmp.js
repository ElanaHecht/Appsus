export default {
   props: ['email'],
   template: `
            <section class="email-preview" :class="readStyle" @mouseover="isHover = true" @mouseleave="isHover = false">
               <h1>{{email.name}}</h1>
               <h1>{{email.subject}}</h1>
               <p>{{email.body}}</p>
               <p v-if="!isHover">{{formatTime}}</p>
               <div v-else><button @click="remove(email.id, email)" >🗑️</button><button @click="markRead()">✉️</button></div>
            </section>
   `,
   data() {
      return {
         isHover: false,
         readEmail: false,
      }
   },
   methods: {
remove(id, email){
   this.$emit('remove', id, email);
}, 
markRead(){
if (!this.readEmail) {
   this.email.criteria.isRead = true;
   return this.readEmail = true;
} else {
   this.email.criteria.isRead = false;
   return this.readEmail = false;
}
}
   },
   computed: {
      formatTime() {
         const date = new Date(this.email.sentAt)
         return `${date.getDate()}/${date.getMonth() + 1}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
      },
      readStyle(){
         return {read: this.readEmail}
      }
   }
}