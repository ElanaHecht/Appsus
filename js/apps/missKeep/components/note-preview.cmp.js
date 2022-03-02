import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodo from "./note-todo.cmp.js"
import noteVideo from "./note-video.cmp.js";



export default{
    
    props:['note'],
    template:`
    <section class = "note-preview">
        
    
    <div class="note-container">
            <note-txt v-if="note.txt" :txt="note.txt"></note-txt>
            <note-video v-if="note.video" :video="note.video"></note-video>
            <note-todo v-if = "note.todo" :todo="note.todo"></note-todo>
            <note-img v-if = "note.img" :img="note.img"></note-img>
        </div>


    </section>
    
    
    `,
    data(){
        return{

        }
    },

    components:{
        noteImg,
        noteTodo,
        noteTxt,
        noteVideo
        

    }
}