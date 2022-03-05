export default {
    props: ['note'],
    template: `
        <section v-if = "videoSource" class = 'note-video'>
                <h3>{{note.title}}</h3>
                <iframe :src="videoSource" ng-show="showvideo"></iframe>
        </section>
    `,
    data() {
        return {
            videoSource: this.note.video
        };
    }

};