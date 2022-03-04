export default {
   props: ['email'],
   template:`
   <section class="expand-email">
      <button @click="fullText">📖</button>
      <div class="email-display">
         <h2>{{email.subject}}</h2>
         <h3>{{email.name}}</h3><h1>{{email.address}}</h1>
         <p>{{email.body}}</p>
      </div>
   </section>
   `,
   methods: {
fullText(){
   this.$emit('fullText', )
}
      }
   }
