import { eventBus } from '../services/eventBus-service.js';

export default {
    template: `
        <section v-if="msg" class="user-msg" >
            <p>{{msg}}</p>
        </section>
    `,
    data() {
        return {
            msg: null
        };
    },
    created() {
        this.unsubscribe = eventBus.on('show-Msg', this.showMsg);
    
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
               console.log(this.msg);
                this.msg = null;
            }, 2000);
        }
    },
    unmounted() {
        this.unsubscribe();
    }
};