export default {
    props: ['img'],
    template: `
    <section class = "img-note">

            <img v-if ="img" :src="img" >
                
    </section>

    `,
    data() {
        return {

        };
    }
}