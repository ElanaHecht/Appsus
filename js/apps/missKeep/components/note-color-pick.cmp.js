import { eventBus } from "../../../services/eventBus-service.js"


export default{
    template:`

        <section class = "color-pick">
        <div @click = "pickedColor" name = "lightgoldenrodyellow" class="color color-yellow"></div>
        <div @click = "pickedColor" name = "lightblue" class="color color-blue"></div>
        <div @click = "pickedColor" name = "lightcoral" class="color color-red"></div>
        <div @click = "pickedColor" name = "rgb(168, 14, 168)" class="color color-purple"></div>
        <div @click = "pickedColor" name = "gold" class="color color-gold"></div>
        <div @click = "pickedColor" name = "lightgreen" class="color color-green"></div>
        <div @click = "pickedColor" name = "white" class="color color-white"></div>
        </section>
    
    `,
    date(){
        return{


        }
    },
    methods:{
        pickedColor(ev){
            const color = ev.path[0].attributes.name.nodeValue
            this.$emit('selectedColor', color)
            // console.log(color);
        }
    }
}


