export default {
   props: ['fullEmail'],
   template: `
            <section class="email-edit">
               <div class="full-header">
                  <div class="email-header">
                     <div>{{email.subject}}</div>
                     <div>
                        <h2>{{email.name}}</h2>
                        <p>{{email.address}}</p>
                     </div>
                  </div>
               </div>
                  <div class="body">{{email.body}}</div>
            </section>
   `,
}