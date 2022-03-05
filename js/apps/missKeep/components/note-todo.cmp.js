import todoLi from './notes-todo-li.cmp.js';

export default {
    props: ['note'],
    template: `
        <section class = 'todo-list'>
            <h3>  {{note.title}}</h3>
            <ul v-for="(todo,index) in note.todo" :key="index">
                <todo-li :todo = 'todo'></todo-li>
            </ul>

        </section>
    `,
    data() {
        return {
        };
    },
    components: {
        todoLi
    },
};