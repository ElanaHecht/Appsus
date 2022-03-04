


export default {
    template: `
        <section class = "note-input">
            
            
            
        <div class="input-container">
            <form action="submit" @submit.prevent = "addNote" class = "flex" >
                    <input type="text" v-model="inputVal" :placeholder = "inputTypeIcon" >
                    
                <div class="input-type-container flex" >
                    <input type="radio" id = "txt" value = "txt" name= "type" v-model="inputType" >
                    <label for="txt"  title="Text"><strong>A</strong></label>
                    <input type="radio" id = "todo" value = "todo" name= "type" v-model="inputType" >
                    <label for="todo" title="Todo list">📝</label>
                    <input type="radio" id = "img" value = "img" name= "type" v-model="inputType" >
                    <label for="img" title="Image">🖼️</label>
                    <input type="radio" id = "video" value = "video" name= "type" v-model="inputType">
                    <label for="video"  title = "Video">🎬</label>
                    <input type="radio" id = "sound" value = "sound" name= "type" v-model="inputType">
                    <label for="sound" title="Sound">🔊</label>
                </div>
            </form>
        </div>
                 
        </section>

    `,

    data() {
        return {
            inputType: 'txt',
            inputVal: null,
            
        };
    },
    methods: {
        addNote() {
            if (!this.inputVal || !this.inputVal) return;
            
            
            const newNote = {
                inputType: this.inputType,
                inputVal: this.inputVal
            };

            this.$emit('addNote', newNote);
            this.inputVal = null
        },


    },
    computed: {
        inputTypeIcon() {
            if (this.inputType === 'txt') return 'whats on your mind';
            if (this.inputType === 'img') return 'Enter image URL';
            if (this.inputType === 'sound') return 'Upload your tune here';
            if (this.inputType === 'video') return 'Upload your video here';
            if (this.inputType === 'todo') return 'Enter your do list here';

        },
        
        



    }
};