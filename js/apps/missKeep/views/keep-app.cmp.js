import notesList from '../components/notes-list.cmp.js';
import notesInput from '../components/notes-input.cmp.js';
import notesFilter from '../components/notes-filter.cmp.js';
import pinnedNotes from '../components/pinned-notes.cmp.js';
import { notesService } from '../service/notes-service.js';
import { eventBus } from '../../../services/eventBus-service.js';
import { utilService } from '../../../services/util-service.js';

export default {
    template: `
       <section  class="keep-app app-layout main-layout ">
           <notes-input @addNote = "addNote" ></notes-input>
           <notes-filter @filtered = 'setFilter'></notes-filter>
            <pinned-notes :notes="pinnedNotes" ></pinned-notes>
            <notes-list :notes="notesForDisplay" v-if = "notes"></notes-list>

       </section>
   `,
    components: {
        notesList,
        notesInput,
        notesFilter,
        pinnedNotes


    },
    data() {
        return {
            allNotes: null,
            notes: null,
            pinnedNotes: null,
            filterBy: null
        };
    },
    created() {
        const prmNotes = notesService.query();
        prmNotes.then(res => this.allNotes = res);
        setTimeout(() => {
            this.sortNotes();
        }, 0);

        this.unsubscribe = eventBus.on('removeNote', this.removeNote);
        this.unsubscribe = eventBus.on('changeColor', this.changeColor);
        this.unsubscribe = eventBus.on('duplicateNote', this.duplicateNote);
        this.unsubscribe = eventBus.on('updateNote', this.updateNote);
        this.unsubscribe = eventBus.on('pinNote', this.pinNote);

    },
    methods: {

        setFilter(filterBy) {
            this.filterBy = filterBy;
        },

        addNote(newNote) {

            if (newNote.inputType === 'todo') {
                const todos = newNote.inputVal.split(',');
                const todoList = todos.map(todo => (
                    { txt: todo, doneAt: null }
                ));
                newNote.inputVal = todoList;
            };

            if (newNote.inputType === 'video') {
                const videoAdress = newNote.inputVal.replace('watch?v=', 'embed/');
                newNote.inputVal = videoAdress;
            }
            notesService.save(newNote);

            setTimeout(() => {
                const prmNotes = notesService.query();
                prmNotes.then(res => this.allNotes = res);
            }, 0);
            setTimeout(() => {
                this.sortNotes();
            }, 100);

        },

        removeNote(id) {
            notesService.remove(id)
                .then(() => {
                    const idx = this.allNotes.findIndex((note) => note.id === id);
                    this.allNotes.splice(idx, 1);
                    this.sortNotes();
                });
            eventBus.emit('show-Msg', 'Note removed');

        },

        changeColor(newColor) {
            const idx = this.allNotes.findIndex(note => note.id === newColor.id);
            this.allNotes[idx].color = `background-color:${newColor.color}`;
            notesService.update(this.allNotes[idx]);
            this.sortNotes();
            eventBus.emit('show-Msg', 'Color changed');

        },

        duplicateNote(note) {
            const newNote = { ...note };

            newNote.id = utilService.makeId();
            notesService.duplicate(newNote);
            this.allNotes.push(newNote);
            this.sortNotes();
            eventBus.emit('show-Msg', 'Note duplicated');

        },

        updateNote(newContent) {
            const noteForUpdate = this.allNotes.find(note => note.id === newContent.id);

            if (noteForUpdate.txt) noteForUpdate.txt = newContent.content;
            if (noteForUpdate.video) noteForUpdate.video = newContent.content;
            if (noteForUpdate.img) noteForUpdate.img = newContent.content;
            if (noteForUpdate.sound) noteForUpdate.sound = newContent.content;
            if (noteForUpdate.todo) {
                const todos = newContent.content.split(',');
                const todoList = todos.map(todo => (
                    { txt: todo, doneAt: null }
                ));
                noteForUpdate.todo = todoList;
            }
            this.sortNotes();
            notesService.update(noteForUpdate);
            eventBus.emit('show-Msg', 'Note updated');

        },

        pinNote(id) {
            const noteToPin = this.allNotes.find(note => note.id === id);

            noteToPin.isPinned = !noteToPin.isPinned;
            notesService.update(noteToPin);
            this.sortNotes();
        },

        sortNotes() {
            this.notes = this.allNotes.filter(note => !note.isPinned);
            this.pinnedNotes = this.allNotes.filter(note => note.isPinned);
        }



    },

    computed: {
        notesForDisplay() {
            if (!this.filterBy) return this.notes;

            if (this.filterBy.type === 'all') {
                const regex = new RegExp(this.filterBy.input, 'i');
                return this.notes.filter(note => regex.test(note.txt) ||
                    regex.test(note.title));
            }



            if (this.filterBy.type === 'txt') {
                if (this.filterBy.input.length > 0) {
                    const regex = new RegExp(this.filterBy.input, 'i');
                    return this.notes.filter(note => regex.test(note.txt));
                } else {
                    return this.notes.filter(note => note.txt);

                }
            }
            if (this.filterBy.type === 'img') {
                if (this.filterBy.input.length > 0) {
                    const regex = new RegExp(this.filterBy.input, 'i');
                    return this.notes.filter(note => regex.test(note.title) && note.img);
                } else {
                    return this.notes.filter(note => note.img);

                }
            }
            if (this.filterBy.type === 'todo') {
                if (this.filterBy.input.length > 0) {
                    const regex = new RegExp(this.filterBy.input, 'i');
                    return this.notes.filter(note => regex.test(note.title) && note.todo);
                } else {
                    return this.notes.filter(note => note.todo);

                }
            }
            if (this.filterBy.type === 'video') {
                if (this.filterBy.input.length > 0) {
                    const regex = new RegExp(this.filterBy.input, 'i');
                    return this.notes.filter(note => regex.test(note.title) && note.video);
                } else {
                    return this.notes.filter(note => note.video);

                }
            }
        }



    },
    unmounted() {
        this.unsubscribe();
    }
};