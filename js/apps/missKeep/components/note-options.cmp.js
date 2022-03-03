import noteColorPick from './note-color-pick.cmp.js';
import { eventBus } from '../../../services/eventBus-service.js';

export default{
    props:['note'],
    template:`
        <section class = "note-options flex space">
            <div class="color-note" >
                <div class="note-btn "  title ="Change color">🎨</div>
                <note-color-pick @selectedColor = "changeColor"></note-color-pick>
            </div>

            <div class="note-btn edit-note" @click = "editNote" title = "Edit">✍</div>
            <div class="note-btn duplicate-note" alt="Duplicate" @click="duplicateNote()" title = "Duplicate">👯</div>
            <div class="note-btn remove-note" @click="removeNote" title = "Remove">❌</div>
            
        </section>
    
    `,
    data(){
        return{
            // noteColor:'white'
            
        }

    },

    components:{
      noteColorPick  
    },

    methods:{
        changeColor(color){
            eventBus.emit('changeColor', {id:this.note.id , color:color});
        },
        removeNote(){
            eventBus.emit('removeNote', this.note.id);
        },

        duplicateNote(){
            eventBus.emit('duplicateNote',this.note);
        },

        editNote(){

        }
    },
    computed:{

    }

}