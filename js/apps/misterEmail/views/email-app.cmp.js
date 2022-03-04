import { eventBus } from '../../../services/eventBus-service.js';
import { emailService } from '../services/email-service.js';
import emailFilter from '../cmps/email-filter.cmp.js';

export default {
    template: `
       <section class="email-app app-layout main-layout">
               <email-filter @filtered="setFilter"/>
            <div class="email-container">
                <div class="side-bar">
                    <router-link class="email-compose" to="/email/compose">Compose</router-link>
                    <div class="flex column">
                        <router-link class="email-folder-list" to="/email/inbox">Inbox</router-link>
                        <router-link class="email-folder-list" to="/email/sent">Sent</router-link>
                        <router-link class="email-folder-list" to="/email/trash">Trash</router-link>
                        <router-link class="email-folder-list" to="/email/draft">Draft</router-link>
                    </div>
                </div>
                <router-view class="view"></router-view>
            </div>
       </section>
   `,
    components: {
        emailFilter,
    },
    data() {
        return {
            emails: null,
            filterBy: null,
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
                console.log(this.emails);
            });
        this.unsubscribe = eventBus.on('sent', this.email);
        this.unsubscribe = eventBus.on('back', this.email);
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        remove(id, email) {
            const idx = this.emails.findIndex((email) => email.id === id);
            this.emails.splice(idx, 1)
            email.criteria.status = 'trash';
            return storageService.remove(STORAGE_KEY, id);
        },
        save(email) {
            return storageService.post(STORAGE_KEY, email);
        },
    },
    computed: {
        emailsForDisplay() {
            if (!this.filterBy) return this.emails;
            const regex = new RegExp(this.filterBy.inputSearch, 'i');
            const selected = this.filterBy.inputSelect
            let filterSearch = this.emails.filter(email => (regex.test(email.criteria.txt)))
            let filterSelect = filterSearch.filter(email => (selected === 'ALL') || ((selected === 'READ') === email.criteria.isRead))
            return filterSelect
        }
    },
    unmounted() {
        this.unsubscribe();
    }
}