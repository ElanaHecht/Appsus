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
function getEmptyEmail(name='', address = '', subject = '', body = '', status='inbox') {
const email = {
        id: '',
        subject,
        body,
        sentAt: Date.now(),
        address,
        name,
        criteria: {
            status,
            txt: '',
            isRead: false,
        }
    };
    console.log(email);
    return email
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_creatEmail('ross geller', 'ross@friends.com', 'We were on a break!', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?'));
        emails.push(_creatEmail('chandler bing', 'chandler@friends.com', 'Could this email be longer?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?'));
        emails.push(_creatEmail('pheobe buffet', 'pheobe@friends.com', 'Smelly cat', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?'));
        emails.push(_creatEmail('joey tribiani', 'joey@friends.com', 'How you doin?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique velit minus veritatis obcaecati animi ullam! Explicabo deserunt eligendi omnis deleniti vero labore, maxime voluptatibus. Quos dolore fuga laudantium nesciunt! Fugit?'));
        utilService.saveToStorage(STORAGE_KEY, emails);
    }
    return emails;
}

function _creatEmail(name, address, subject, body) {
    const email = getEmptyEmail(name, address, subject, body)
    email.id = utilService.makeId()
    return email;
}



