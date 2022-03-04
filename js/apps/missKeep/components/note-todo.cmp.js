import todoLi from './notes-todo-li.cmp.js';


export default{
    props:['todos'],
    template:`
        <section class = 'todo-list'>
            <ul v-for="(todo,index) in todos" :key="index">
            <todo-li :todo = 'todo'></todo-li>
            </ul>

        </section>
    `,
    data(){
        return{
        }
    },
    components:{
        todoLi
    },
    methods:{
        
    
    },
    computed:{
        
    }
}