export default {
   props: ['emails'],
   template: `
       <section class="email-folder-list">
          <!-- <ul class="list-style">
             <li>Inbox <span>0</span></li>
             <li>Sent</li>
             <li>Trash</li>
             <li>Draft</li>
          </ul> -->
            <form @change = "setFolder" >
               <div class="folder-list flex column" >
                  <label for="inbox">Inbox</label>
                     <input type="radio" id = "inbox" value = "inbox" v-model="folder" >
                  <label for="sent">Sent</label>
                     <input type="radio"  id = "sent" value="sent" name= "type" v-model="folder" >
                  <label>Trash</label>
                     <input type="radio"  id = "trash" value= "trash" v-model="folder" >
                  <label>Draft</label>
                     <input type="radio"  id = "draft" value= "draft" v-model="folder">
               </div>
            </form>
       </section>
   `,
   created() {
   },
   data() {
      return {
         folder: 'inbox',
      }
   },
   methods: {
      setFolder() {
      console.log(this.folder);
         this.$emit('setFolder', this.folder)
      }
   },
   watch: {
      
   }
}