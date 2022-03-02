export default {
    template: `
       <section class="email-filter">
           <form @submit.prevent="setFilter" >
               <button>🔍</button>
           <label>
               <input 
                   type="search"
                   @input="setFilter"
                   v-model="filterBy.inputSearch" 
                   placeholder="Search"
               />
               </label>
           <label>
               <select @change="setFilter" v-model="filterBy.inputSelect">
               <option value="ALL">All</option>
               <option value="READ" >Read</option>
               <option value="UNREAD" >UnRead</option>
               </select>
           </label>
           </form>
       </section>
   `,
    data() {
        return {
            filterBy: {
                inputSearch: '',
                inputSelect: '',
            },
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy });
        },
    }
}