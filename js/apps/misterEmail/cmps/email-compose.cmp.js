export default {
   template: `
       <section class="email-compose">
          <button class="compose-btn" @click="openCompose">Compose</button>
       </section>
   `,
   methods: {
      openCompose(){
         console.log('compose opened');
      }
   }
}