export default {
    props: ['todo'],
    template: `
        <section class = todo-li>
            <li @click = "check"  :class = "{checked : isChecked}">{{todo.txt}}</li>
            <hr>
        </section>
    `,
    data() {
        return {
            isChecked: false,
        };
    },
    methods: {
        check() {
            this.todo.doneAt = Date.now();
            this.isChecked = !this.isChecked;
            if (!this.isChecked) this.todo.doneAt = null;
        }
    },

};