export default {
    template: `
        <section class = "notes-filter-container">
                <input type="text" class = "search-input" @input = "setFilter" v-model="filterBy.input" placeholder = "Search">
                <select name="" class = "notes-select" @change = "setFilter" v-model = "filterBy.type">
                    <option value="all">All</option>
                    <option value="txt">Text</option>
                    <option value="img">Image</option>
                    <option value="todo">Todos</option>
                    <option value="video">Videos</option>
                </select>
        </section>
    `,
    data() {
        return {
            filterBy: {
                type: 'all',
                input: ''
            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy });
        },
    }
};