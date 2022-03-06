import { eventBus } from '../../../services/eventBus-service.js';
import { emailService } from '../services/email-service.js';
import { storageService } from '../../../services/async-storage-service.js';
import emailFilter from '../cmps/email-filter.cmp.js';

export default {
    template: `
       <section class="email-app app-layout main-layout">
               <email-filter @filtered="setFilter"/>
            <div class="email-container">
                <div class="side-bar">
                    <router-link class="email-compose-btn" to="/email/compose">+ Compose</router-link>
                    <div class="folders flex column">
                        <router-link  @click="openInbox" :class="selectInbox" class="email-folder-list" to="/email/inbox">Inbox<span>{{count}}</span></router-link>
                        <router-link @click="openSent" :class="selectSent" class="email-folder-list" to="/email/sent">Sent</router-link>
                        <router-link @click="openTrash" :class="selectTrash" class="email-folder-list" to="/email/trash">Trash</router-link>
                        <router-link @click="openDraft" :class="selectDraft" class="email-folder-list" to="/email/draft">Draft</router-link>
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
            unreadCount: 0,
            folder: 'inbox',
            isInboxOpen: true,
            isSentOpen: false,
            isTrashOpen: false,
            isDraftOpen: false,
                }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails;
                console.log(this.emails);
                // this.unreadCount = emails.forEach( email => {
                //     if (!email.criteria.isRead) this.unreadCount++
                // })
            });
            this.$router.push('/email/inbox')
    },
    methods: {
        openInbox(){
            this.isInboxOpen = true;
            this.isSentOpen = false;
            this.isDraftOpen = false;
            this.isTrashOpen = false;
        },
        openSent(){
            this.isInboxOpen = false;
            this.isSentOpen = true;
            this.isDraftOpen = false;
            this.isTrashOpen = false;
        },
        openTrash(){
            this.isInboxOpen = false;
            this.isSentOpen = false;
            this.isTrashOpen = true;
            this.isDraftOpen = false;
        },
        openDraft(){
            this.isInboxOpen = false;
            this.isSentOpen = false;
            this.isTrashOpen = false;
            this.isDraftOpen = true;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
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
        },
        selectInbox(){
            return {selected: this.isInboxOpen}
        },
        selectSent(){
            return {selected: this.isSentOpen}
        },
        selectTrash(){
            return {selected: this.isTrashOpen}
        },
        selectDraft(){
            return {selected: this.isDraftOpen}
        },
        count(){
            return this.unreadCount
        }
    },
}