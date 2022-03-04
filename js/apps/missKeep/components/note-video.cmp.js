export default {
    props: ['note'],
    template: `
     

        <section v-if = "videoSource" class = 'note-video'>
                <h3>{{note.title}}</h3>
                <iframe width="175" height="150" :src="videoSource" ng-show="showvideo"></iframe>
        </section>
    
    
    `,
    data(){
        return{
            videoSource:this.note.video

        }
    },
    created(){
    //    console.log(this.videoSource);
    },
    methods:{

    }
}