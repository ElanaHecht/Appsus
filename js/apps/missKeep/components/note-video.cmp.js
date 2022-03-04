export default {
    props: ['video'],
    template: `
     

        <section v-if = "video" class = 'note-video'>
            <!-- <video :src="video" type="video/mp4"></video> --> 
                <iframe width="175" height="150" :src="video" ng-show="showvideo"></iframe>
            <!-- <p alt="text"><strong>A</strong></p> -->
        </section>
    
    
    `,
    data(){
        return{
            videoSource:this.video

        }
    },
    created(){
       console.log(this.video);
    },
    methods:{

    }
}