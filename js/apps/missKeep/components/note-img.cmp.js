export default {
    props: ['note'],
    template: `
    <section class = "img-note">
            <h3>{{note.title}}</h3>
            <img v-if ="note.img" :src="note.img" >  
    </section>
    `,

};