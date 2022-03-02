import notesList from '../components/notes-list.cmp.js';
import notesInput from '../components/notes-input.cmp.js';
import { notesService } from '../service/notes-service.js';

export default {
   template:`
       <section class="keep-app app-layout main-layout">
               <h1>Keep App</h1>
               <notes-input @addTxt = "addTxt" ></notes-input>
                <notes-list></notes-list>

       </section>
   `,
   components:{
    notesList,
    notesInput


   },
   data(){
    return{


    }
   },
   methods:{
       addTxt(str){
           console.log(str);
           notesService.save(str)
       }

   }
}