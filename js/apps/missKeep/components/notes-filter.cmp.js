export default {
    props: [],


    template: `
        <section class = "notes-filter">
        <div class = "notes-filter-container">
                <input type="text" class = "search-input" @input = "setFilter" v-model="filterBy.input" placeholder = "search">
                <select name="" class = "notes-select" @change = "setFilter" v-model = "filterBy.type">
                    <option value="all">All</option>
                    <option value="txt">Text</option>
                    <option value="img">Image</option>
                    <option value="todo">Todos</option>
                    <option value="video">Videos</option>
                </select>
            </div>

        </section>

    
    `,
    data() {
        return {
            filterBy:{
                type: 'all',
                input: ''
            }

        };
    },

    methods: {
        setFilter(){
            // console.log(this.filterBy);
            this.$emit('filtered',{...this.filterBy})
        },
      
    }



};