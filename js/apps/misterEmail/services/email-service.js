import { storageService } from '../../../services/async-storage-service.js';
import { utilService } from '../../../services/util-service.js'

const STORAGE_KEY = 'emailDB';
_createEmails();

export const emailService = {
    query,
    remove,
    save,
    get,
    getEmptyEmail,
};

const compose = {
    title: 'New Message',
    cmps: [
        {
            type: 'toBox',
            info: {
                label: 'To:'
            }
        },
        {
            type: 'subjectBox',
            info: {
                label: 'Subject:'
            }
        },
        {
            type: 'bodyBox',
            info: {
                label: '',
            }
        },
    ]
}

function query() {
    return storageService.query(STORAGE_KEY);
}

function remove(emailId) {
    return storageService.remove(STORAGE_KEY, emailId);
}

function get(emailId) {
    return storageService.get(STORAGE_KEY, emailId)
    //  .then(email => {
    //      return _setNextPrevEmailId(email)
    //  })
}

function save(email) {
    if (email.id) return storageService.put(STORAGE_KEY, email);
    else return storageService.post(STORAGE_KEY, email);
}

// Factory Method:
function getEmptyEmail(name, to = '', subject = '', body = '', txt) {
    return {
        id: '',
        name,
        subject,
        body,
        sentAt: 0,
        to,
        criteria: {
            status: 'inbox',
            txt,
            isRead: false,
        }
    };
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_creatEmail('ross geller', 'ross@friends.com', 'We were on a break!', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?', 'ross'));
        emails.push(_creatEmail('chandler bing', 'chandler@friends.com', 'Could this email be longer?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?', 'chandler'));
        emails.push(_creatEmail('pheobe buffet', 'pheobe@friends.com', 'Smelly cat', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?', 'pheobe'));
        emails.push(_creatEmail('joey tribiani', 'joey@friends.com', 'How you doin?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?', 'joey'));
        utilService.saveToStorage(STORAGE_KEY, emails);
    }
    return emails;
}

function _creatEmail(name = 'Gunther', to, subject, body, txt = 'abcdefg') {
    const email = getEmptyEmail(name, to, subject, body, txt)
    email.id = utilService.makeId()
    email.sentAt = Date.now()
    return email;
}



