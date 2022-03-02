


export default{
    template:`
        <section class = "note-input">
        <input type="text" @change = "addNote">

        </section>

    `,

    data(){
        return{

        }
    },
    methods:{
        addNote(str){
            const txt = str.target.value;
            console.log('adding text');

            this.$emit('addTxt',str.target.value)
        }

    },
    computed:{


    }
}