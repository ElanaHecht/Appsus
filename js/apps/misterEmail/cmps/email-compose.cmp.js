export default {
   template: `
       <section class="email-compose">
          <button @click="openCompose">Compose</button>
       </section>
   `,
   methods: {
      openCompose(){
         console.log('compose opened');
      }
   }
}