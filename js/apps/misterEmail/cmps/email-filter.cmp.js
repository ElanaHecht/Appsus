export default {
   template: `
       <section class="email-filter">
           <label>
               Search
               <input 
                   @input="setFilter" 
                   type="text" 
                   v-model="filterBy.txt" 
                   placeholder="emails"
               />
           </label>
           <!-- <label>
               <select
                   @input="setFilter" 
                   type="text" 
                   v-model="filterBy.txt" 
                   placeholder="emails"
               >
               <option value=""></option>
               </select>
           </label> -->
       </section>
   `,
   data() {
       return {
           filterBy: {
              txt: '',
               // toEmail: '',
               // subject: '',
           }
       };
   },
   methods: {
      setFilter() {
          this.$emit('filtered', { ...this.filterBy });
      }
  }
}