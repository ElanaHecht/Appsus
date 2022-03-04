export default {
    template: `
       <section class="email-filter">
           <form @submit.prevent="setFilter" class="flex">
               
               <button>🔍</button>
               <input type="search" @input="setFilter" v-model="filterBy.inputSearch" placeholder="Search" />           
               <select @change="setFilter" v-model="filterBy.inputSelect">
               <option value="ALL">All</option>
               <option value="READ" >Read</option>
               <option value="UNREAD" >UnRead</option>
               </select>
           </form>
       </section>
   `,
    data() {
        return {
            filterBy: {
                inputSearch: '',
                inputSelect: 'ALL',
            },
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy });
        },
    }
}