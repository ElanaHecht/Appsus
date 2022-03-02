export default {
   props: ['email'],
   template: `
            <section class="email-preview">
               <h1>{{email.name}}</h1>
               <h1>{{email.subject}}</h1>
               <p>{{email.body}}</p>
               <!-- <p>{{formatTime}}</p> -->
            </section>
   `,
   data() {
      return {

      }
   },
}