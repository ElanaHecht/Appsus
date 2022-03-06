import { storageService } from '../../../services/async-storage-service.js';
import { utilService } from '../../../services/util-service.js';

export const notesService = {
    query,
    remove,
    save,
    getEmptynote,
    get,
    update,
    duplicate
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
    
    if(note.inputTitle) newNote.title = note.inputTitle;

    return storageService.post(NOTES_KEY, newNote);
}

function duplicate(dupe){
    return storageService.post(NOTES_KEY,dupe)
}

function getEmptynote() {
    return {
        id: utilService.makeId(),
        txt:null,
        video:null,
        img:null,
        todo:null,
        title:null,
        isPinned: false,
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


const notesStarter = [

    {
        id: utilService.makeId(),
        txt:'Dude where is my car?',
        video:null,
        title:null,
        img:null,
        todo:null,
        isPinned: true,
        color: "background-color:lightgreen"
    },
    {
        id: utilService.makeId(),
        txt:'I like to overthink everything',
        video:null,
        title:null,
        img:null,
        todo:null,
        isPinned: false,
        color: "background-color:lightgoldenrodyellow"
    },
    {
        id: utilService.makeId(),
        txt:null,
        title:'Cute dog',
        video:null,
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgM1ZoErp4F5LhG1_f7oJbciBadJB5MiqNDg&usqp=CAU',
        todo:null,
        isPinned: false,
        color: "background-color:lightgreen"
    },
    {
        id: utilService.makeId(),
        txt:null,
        video:'https://www.youtube.com/embed/Q3no26KDuh0',
        title:'Hektor Oaks',
        img:null,
        todo:null,
        isPinned: false,
    },
    {
        id: utilService.makeId(),
        txt:null,
        video:null,
        img:null,
        title:'Shopping List',
        todo:[
            {txt: "Eggs", doneAt: null},
            {txt: "Potato", doneAt: null},
            {txt: "Soy Milk", doneAt: null},
            {txt: "Beef!!!", doneAt: null}
        ],
        isPinned: false,
    },
    {
        id: utilService.makeId(),
        txt:null,
        video:'https://www.youtube.com/embed/1rqjeF9kBn8',
        title:'70s Soul',
        img:null,
        todo:null,
        isPinned: false,
        color: "background-color:gold;"
    },
    {
        id: utilService.makeId(),
        txt:null,
        video:null,
        title:'Potato',
        img:'https://media.istockphoto.com/vectors/vector-illustration-of-a-funny-potato-in-cartoon-style-vector-id1189117812?k=20&m=1189117812&s=612x612&w=0&h=n3o3tkahNxXxMpb3EhTEp9TaMXrOwNELXKItqtkXC7g=',
        todo:null,
        isPinned: false,
        color: "background-color:rgb(168, 14, 168)"
    },
    {
        id: utilService.makeId(),
        txt:null,
        video:'https://www.youtube.com/embed/5qap5aO4i9A',
        title:'Lofi Radio',
        img:null,
        todo:null,
        isPinned: false,
        color: "background-color:lightcoral"
    },
    {
        id: utilService.makeId(),
        txt:null,
        title:'Cat',
        video:null,
        img:'https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1',
        todo:null,
        isPinned: false,
        color: "background-color:lightgreen"
    },
    {
        id: utilService.makeId(),
        txt:null,
        title:'Another Cat',
        video:null,
        img:'https://images1.calcalist.co.il/PicServer3/2017/04/24/720257/1LM.gif',
        todo:null,
        isPinned: false,
        color: "background-color:gold"
    },
    {
        id: utilService.makeId(),
        txt:null,
        title:'Weird Horse',
        video:null,
        img:'https://worldbirds.com/wp-content/uploads/2020/05/unicorn3.jpg',
        todo:null,
        isPinned: false,
        color: "background-color:lightcoral"
    },
    {
        id: utilService.makeId(),
        txt:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the mmy text ever since the 1500s',
        title:null,
        video:null,
        img:null,
        todo:null,
        isPinned: false,
        color: "background-color:lightcoral"
    },
]

_createnotes(notesStarter);

