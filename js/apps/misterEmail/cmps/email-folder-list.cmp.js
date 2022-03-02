export default {
   template: `
       <section class="email-folder-list">
          <ul>
             <li @click="setFolder">Inbox</li>
             <li @click="setFolder">Sent</li>
             <li @click="setFolder">Trash</li>
             <li @click="setFolder">Draft</li>
          </ul>
       </section>
   `,
   data(){
      return {
         status: '',
      }
   },
   methods: {
      setFolder(ev) {
this.status = ev.target.innerText;
console.log(this.status);
      },
   }
}