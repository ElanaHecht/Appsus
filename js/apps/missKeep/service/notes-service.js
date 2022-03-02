import { storageService } from '../../../services/async-storage-service.js';
import { utilService } from '../../../services/util-service.js';

export const notesService = {
    query,
    remove,
    save,
    getEmptynote,
    get,
    update
};

const NOTES_KEY = 'notesDB';




function query() {
    return storageService.query(NOTES_KEY);
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId);
}

function update(note) {
    return storageService.put(NOTES_KEY, note);
}


function save(note) {
    const noteType = note.inputType;
    const newNote = getEmptynote();
    newNote[noteType] = note.inputVal;
    return storageService.post(NOTES_KEY, newNote);
}

function getEmptynote() {
    return {
        id: utilService.makeId(),
        txt: null,
        isPinned: false,
        img: null,
        todo: null,
        video: null,
        sound: null


    };
}

function _createnotes(notesData) {
    let notes = storageService.query(NOTES_KEY);
    notes.then(notes => {
        if (!notes || !notes.length) {
            storageService.postMany(NOTES_KEY, notesData);
        } else {
            return;
        }
    });
}

