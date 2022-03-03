import notesList from '../components/notes-list.cmp.js';
import notesInput from '../components/notes-input.cmp.js';
import { notesService } from '../service/notes-service.js';
import { utilService } from '../../../services/util-service.js';
import { eventBus } from '../../../services/eventBus-service.js';

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
        prmNotes.then(res => this.notes = res);

        this.unsubscribe = eventBus.on('removeNote', this.removeNote);






    },
    methods: {
        addNote(newNote) {

            notesService.save(newNote);

            setTimeout(() => {
                const prmNotes = notesService.query();
                prmNotes.then(res => this.notes = res);
            }, 100);
        },
        removeNote(id){
            console.log('removing', id);
            notesService.remove(id)
                .then(()=>{
                    const idx = this.notes.findIndex((note) => note.id === id)
                    this.notes.splice(idx , 1);
                    console.log('note removed successfuly!!');
                })

        }
        

    }
};