
export default {
   template: `
      <section class="email-compose app-layout main-layout">
         <form @submit.prevent="save">
            <label>To:
            <input type="text"/>
            </label>
            <label>Subject:
            <input type="text" />
            </label>
            <textarea></textarea>
            <button>Send</button>
         </form>
      </section>
   `,
   components: {
   },
   methods: {
      save() {
         console.log('saved');
      },
   }
}
