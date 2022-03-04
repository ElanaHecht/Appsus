import notePreview from './note-preview.cmp.js';


export default{
    props:['notes'],
    template:`
        <section class = 'notes-list main-layout'>
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
    },
    methods:{

    },

    computed:{

    },
   
}