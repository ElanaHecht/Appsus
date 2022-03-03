import emailPreview from './email-preview.cmp.js'

export default {
   props: ['emails'],
   template: `
            <section class="email-list">
               <h1 v-if="!emails">You don't have any emails...</h1>
               <ul>
                  <li v-for="email in emails" :key="email.id"  @click="select(email.id)">
               <email-preview :email="email" @remove="removeEmail" @setRead="setRead"/>
                  </li>
               </ul>
            </section>
   `,
   components: {
      emailPreview,
   },
   methods: {
      removeEmail(id, email) {
         this.$emit('remove', id, email)
      },
      setRead(email) {
         this.$emit('setRead', email)
      },
      select(id) {
         this.$emit('selected', id)
      }
   }
}
