import { utilService } from '../services/util-services.js'
import { storageService } from '../services/async-storage-service.js';

const STORAGE_KEY = 'emailDB';
_createEmails();

export const emailService = {
    query,
    remove,
    save,
    get,
    getEmptyEmail,
};

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
function getEmptyEmail(to = '', subject = '', body = '') {
    return {
        id: '',
        subject,
        body,
        isRead: false,
        sentAt: 0,
        to,
    };
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_creatEmail('rachel@friends.com', 'On a break?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?'));
        emails.push(_creatEmail('ross@friends.com', 'We were on a break!', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?'));
        emails.push(_creatEmail('chandler@friends.com', 'Could this email be longer?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?'));
        emails.push(_creatEmail('pheobe@friends.com', 'Smelly cat', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?'));
        emails.push(_creatEmail('joey@friends.com', 'How you doin?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?'));
        utilService.saveToStorage(STORAGE_KEY, emails);
    }
    return emails;
}

function _creatEmail(to, subject, body) {
    const email = getEmptyEmail(to, subject, body)
    email.id = utilService.makeId()
    email.sentAt = Date.now()
    return email;
}



