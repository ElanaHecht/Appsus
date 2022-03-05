


export default {
    template: `
    <section>            
            <form action="submit" @submit.prevent = "addNote" class = "note-form" >
                <div class = "note-inputs">
                    
                    <transition name = "slide-fade">
                        <input type="text" class = "note-title-input" v-if = "isTitle"  v-model="inputTitle" placeholder = "Title" @keyup.enter="addNote">
                    </transition>
                    <input type="text" class = "note-content-input" :class="{switch: isTitle}" v-model="inputVal" :placeholder = "inputTypeIcon" @keyup.enter="addNote" >
                </div>
                    

                    <div class="input-type-container flex" >
                        <input type="radio" id = "txt" value = "txt" name= "type" v-model="inputType" >
                        <label for="txt"  title="Text" @click = "noTitle"><strong>A</strong></label>
                        <input type="radio" id = "todo" value = "todo" name= "type" v-model="inputType" >
                        <label for="todo" title="Todo list" @click = "needTitle">📝</label>
                        <input type="radio" id = "img" value = "img" name= "type" v-model="inputType" >
                        <label for="img" title="Image" @click = "needTitle">🖼️</label>
                        <input type="radio" id = "video" value = "video" name= "type" v-model="inputType">
                        <label for="video"  title = "Video"  @click = "needTitle">🎬</label>
                        <!-- <input type="radio" id = "sound" value = "sound" name= "type" v-model="inputType">
                        <label for="sound" title="Sound">🔊</label> -->
                    </div>
            </form>                  
    </section>

    `,

    data() {
        return {
            inputType: 'txt',
            inputVal: null,
            inputTitle: null,
            isTitle: false
        };
    },
    methods: {
        addNote() {
            if (!this.inputVal || !this.inputType) return;
            if (this.inputType !== 'txt' && (!this.inputTitle || !this.inputVal)) return;

            console.log('submitting');
            const newNote = {
                inputType: this.inputType,
                inputVal: this.inputVal,
                inputTitle: this.inputTitle
            };

            this.$emit('addNote', newNote);
            this.inputVal = null;
            this.inputTitle = null;
        },
        needTitle() {
            this.isTitle = true;
        },
        noTitle() {
            this.isTitle = false;
        }


    },
    computed: {
        inputTypeIcon() {
            if (this.inputType === 'txt') return 'Whats on your mind';
            if (this.inputType === 'img') return 'Enter image URL';
            if (this.inputType === 'sound') return 'Upload your tune here';
            if (this.inputType === 'video') return 'Enter youtube URL here';
            if (this.inputType === 'todo') return 'Enter your do list here';

        },





    }
};