import noteColorPick from './note-color-pick.cmp.js';
import { eventBus } from '../../../services/eventBus-service.js';

export default{
    props:['note'],
    template:`
        <section class = "note-options">
            <div class="color-note" >
                <div class="note-btn "  title ="Change color">🎨</div>
                <note-color-pick @selectedColor = "changeColor"></note-color-pick>
            </div>
            <div class="note-btn edit-note" @click = "editNote" title = "Edit">✍</div>
            <div class="note-btn duplicate-note" @click="duplicateNote()" title = "Duplicate">👯</div>
            <div class="note-btn remove-note" @click="removeNote" title = "Remove">❌</div>
           
            <div v-if = "editMode" class = "note-edit-container">
                <input type="text" v-model = "updateContent" class = "edit-input">
                <div class="edit-buttons">
                    <button @click = "updateNote" class = "btn-edit btn-confirm-edit" >Update</button>
                    <button @click = "closeEdit" class = "btn-edit btn-cancel-edit">Cancel</button>
                </div>
            </div>
        <pre>{{updateContent}}</pre>
        </section>
    
    `,
    data(){
        return{
            editMode: false,
            updateContent: null
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
            this.editMode = true;
            console.log('hello');
        },
        closeEdit(){
            this.editMode = false
        },
        updateNote(){
            eventBus.emit('updateNote', {id:this.note.id, content:this.updateContent })

            this.editMode = false; 

            console.log('update');
        }
    },
    computed:{

    }

}