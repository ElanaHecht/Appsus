import notesList from '../components/notes-list.cmp.js';
import notesInput from '../components/notes-input.cmp.js';
import { notesService } from '../service/notes-service.js';

export default {
    template: `
       <section  class="keep-app app-layout main-layout">
               <h1>Keep App</h1>
               <notes-input @addNote = "addNote" ></notes-input>
                <notes-list :notes="notes" v-if = "notes"></notes-list>

       </section>
   `,
    components: {
        notesList,
        notesInput


    },
    data() {
        return {
            notes: null,

        };
    },
    created() {
        const prmNotes = notesService.query();
        prmNotes.then(res => this.notes = res )
       
       
        setTimeout(() => {
            console.log(this.notes);
        }, 200);
            
        

        
    },
    methods: {
        addNote(newNote) {
            console.log(newNote);
            notesService.save(newNote);

        }

    }
};