export default {
    props: ['video'],
    template: `
     

        <section v-if = "video" class = 'note-video'>
            <!-- <video :src="video" type="video/mp4"></video> -->
            <!-- <iframe width="420" height="350" src="https://www.youtube.com/embed?v=n61ULEU7CO0"></iframe> -->
        <!-- <p alt="text"><strong>A</strong></p> -->
        </section>
    
    
    `,
    data(){
        return{


        }
    },
    created(){
       
    },
    methods:{

    }
}