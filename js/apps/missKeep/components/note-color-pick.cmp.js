export default{
    template:`

        <section class = "color-pick">
        <div @click = "pickedColor" name = "lightgoldenrodyellow" class="color color-yellow"></div>
        <div @click = "pickedColor" name = "lightblue" class="color color-blue"></div>
        <div @click = "pickedColor" name = "lightcoral" class="color color-red"></div>
        <div @click = "pickedColor" name = "lightsalmon" class="color color-salmon"></div>
        <div @click = "pickedColor" name = "lightcyan" class="color color-cyan"></div>
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




// .color-yellow{
//     background-color: lightgoldenrodyellow;
// }
// .color-blue{
//     background-color: lightblue;
// }
// .color-red{
//     background-color: lightcoral;
// }
// .color-salmon{
//     background-color: lightsalmon;
// }
// .color-cyan{
//     background-color: lightcyan;
// }
// .color-green{
//     background-color: lightgreen;
// }
// .color-white{
//     background-color: white;
// }