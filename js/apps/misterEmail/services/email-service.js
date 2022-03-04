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
        id: utilService.makeId(),
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
        emails.push(_creatEmail('ross geller', 'ross@friends.com', 'We were on a break!', 'Hey there, How are you? I hope everyone is doing well. Going for a walk but I hope to see you later. Let me know if you want to hang out. Thanks,Ross'));
        emails.push(_creatEmail('chandler bing', 'chandler@friends.com', 'Could this email be longer?', 'Hey! Whassup? Where you been? Call me!'));
        emails.push(_creatEmail('pheobe buffet', 'pheobe@friends.com', 'Smelly cat', ''));
        emails.push(_creatEmail('joey tribiani', 'joey@friends.com', 'How you doin?', 'so understated he could be swedish or so sehr praktisch even deutsch with his grey haus­- schuhe in the door of a space safe with church tax rent controlan automatic heating plan and cheap light softened by synthetic glass refracting'));
        utilService.saveToStorage(STORAGE_KEY, emails);
    }
    return emails;
}

function _creatEmail(name, address, subject, body) {
    const email = getEmptyEmail(name, address, subject, body)
    email.criteria.txt = `${name} ${subject} ${body}`
    return email;
}



