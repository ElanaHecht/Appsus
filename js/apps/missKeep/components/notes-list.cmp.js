import notePreview from './note-preview.cmp.js';


export default{
    props:['notes'],
    template:`
        <section class = 'notes-list main-layout flex'>

    <note-preview v-for="note in notes" :key="note.id" :note = "note"></note-preview>


        </section>

    
    `,
    data(){
        return{



        }

    },

    components:{
        notePreview,
        

    },
    created(){
        console.log('keep-list',this.notes);
    },
    methods:{


    },

    computed:{

    }
}