import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodo from "./note-todo.cmp.js"
import noteVideo from "./note-video.cmp.js";
import noteOptions from "./note-options.cmp.js";


export default{
    
    props:['note'],
    template:`
    <section class = "note-preview" :style="note.color">
            <div v-if ="note.isPinned" class="pin">📌</div>
            <note-txt v-if="note.txt" :txt="note.txt"></note-txt>
            <note-video v-if="note.video" :note="note"></note-video>
            <note-todo v-if = "note.todo" :note ="note"></note-todo>
            <note-img v-if = "note.img" :note="note"></note-img>
            <note-options  :note = "note"></note-options>
    </section>
    
    
    `,
    data(){
        return{
            
            
        }
    },
    methods:{
     
    },

    components:{
        noteImg,
        noteTodo,
        noteTxt,
        noteVideo,
        noteOptions
        

    }
}