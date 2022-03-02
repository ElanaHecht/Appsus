import noteColorPick from "./note-color-pick.cmp.js"

export default{

    template:`
        <section class = "note-options flex space">
            <div class="color-note">
                <div class="note-btn " @click="pickColor">🎨</div>
                <note-color-pick @selectedColor = "changeColor"></note-color-pick>
            </div>

            <div class="note-btn edit-note" @click = "editNote">✍</div>
            <div class="note-btn duplicate-note" alt="Duplicate" @click="duplicateNote()">👯</div>
            <div class="note-btn remove-note" @click="removeNote" >❌</div>

        </section>
    
    `,
    data(){
        return{

        }

    },

    components:{
      noteColorPick  
    },

    methods:{
        changeColor(){

        },
        removeNote(){

        },

        duplicateNote(){

        },

        editNote(){

        }
    },
    computed:{

    }

}