import emailPreview from './email-preview.cmp.js'

export default {
   props: ['emails'],
   template: `
            <section class="email-folder-list">
               <h1 v-if="!emails">You don't have any emails...</h1>
               <ul>
                  <li v-for="email in emails" :key="email.id">
               <email-preview :email="email"/>
                  </li>
               </ul>
            </section>
   `,
   components: {
      emailPreview,
   },
   data() {
      return {

      }
   },
}