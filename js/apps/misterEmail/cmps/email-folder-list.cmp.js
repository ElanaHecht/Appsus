export default {
   props: ['emails'],
   template: `
       <section class="email-folder-list">
          <ul class="list-style">
          <!-- {{emailsUnread}} -->
             <li @click="setFolder">Inbox <span>0</span></li> 
             <li @click="setFolder">Sent</li>
             <li @click="setFolder">Trash</li>
             <li @click="setFolder">Draft</li>
          </ul>
       </section>
   `,
   created() {
   },
   data() {
      return {
         status: '',
         unRead: 0,
      }
   },
   methods: {
      setFolder(ev) {
         this.status = ev.target.innerText;
         this.$emit('setFolder', this.status)
      }
   },
   computed: {
      // emailsUnread() {
      //    return this.emails.length
      // }
   }
}