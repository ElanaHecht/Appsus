export default{
    props:['todos'],
    template:`
        <section class = 'todo-list'>
            <ul>
                <li v-for="(todo,index) in todos" :key="index">
                    {{todo}}
                    {{index}}
                </li>
            </ul>

        </section>
    `,
    data(){
        return{
            checked: null
        }
    },
    methods:{
        // markTodo(idx){
        //     (this.checked === idx) ? (this.checked = null) : (this.checked = idx);
        //     console.log(idx);
        // }
    },
    computed:{
        // liCheck(idx){
        //     if(this.checked === idx) return {checked : true}
        // }
    }
}