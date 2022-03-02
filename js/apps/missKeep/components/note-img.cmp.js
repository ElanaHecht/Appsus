export default {
    props: ['img'],
    template: `
    <section class = "img-note">

            
            <img v-if ="img" :src="img" alt="">
            
    </section>

    `,
    data() {
        return {

        };
    }
}