
<template>
  <div>
  
       
    
      <!-- End Page Header -->
            <!-- Default Light Table -->
           <div class="container-fluid">
        <hr>
    <div class="row-fluid">
      <div class="span12">
                                          <div>

                                        <download-excel
                                            class="btn btn-default pull-right"
                                            style="cursor:pointer;"
                                              :fields = "json_fields"
                                              title="Liste plan budgetaire "
                                              name ="Liste plan budgetaire"
                                              worksheet = "plan budgetaire"
                                            :data="localisationsFiltre">
           <i title="Exporter en excel" class="icon-table"> Exporter en excel</i>

                                                 </download-excel> 
                                     </div> <br>
        <div class="widget-box">
             <div class="widget-title"> <span class="icon"> <i class="icon-th"></i> </span>
            <h5>Liste des plans budgetaires</h5>
             <div align="right">
        Rechercher: <input type="text" v-model="search">

          </div>
             
          </div>
         
           <div class="widget-content nopadding">
            <!-- <table class="table table-bordered table-striped">
              <thead>
                <tr>
                 <th>Code</th>
                  <th>Libelle</th>
                  <th>Structure budgetaire</th>
                   <th>Action</th>
                </tr>
              </thead>
              <tbody> 
                <tr class="odd gradeX" v-for="(plans, index) 
                in localisationsFiltre" :key="plans.id">
                  <td @dblclick="afficherMoadlModifierLocalisation(index)">
                    {{plans.code || 'Non renseigné'}}</td>
                   <td @dblclick="afficherMoadlModifierLocalisation(index)">
                    {{plans.libelle || 'Non renseigné'}}</td>

                   <td @dblclick="afficherMoadlModifierLocalisation(index)">
                  {{(plans.structure_budgetaire.libelle) || 'Non renseigné'}}</td>
                  <td>




              <div class="btn-group">
              <button @click.prevent="supprimerPlanBudgetaire(plans.id)"  class="btn btn-danger ">
                <span class=""><i class="icon-trash"></i></span></button>
             
            </div>

                  </td>
                </tr>
              </tbody>
            </table> -->

            <ul id="demo">

              <tree class="item" v-for="plan in lesPlansParents"
              :key="plan.id" :item="plan"
               @ajouterElementEnfant="ajouterElementEnfant"
               @supprimer="supprimerPlanBudgetaireLocal"
               @modifier="afficherModalModifierPlanBudgetaire"></tree>
            </ul>
            <div v-if="lesPlansParents.length">
            </div>
            <div v-else>
              <div align="center">
                <h6 style="color:red;">Aucun plan budgetaire enregistré ! </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
              </div>
            </div>

     

<!----- ajouter modal   ---->


 <div id="exampleModal" class="modal hide">
              <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Ajouter plans  budgetaire</h3>
              </div>
              <div class="modal-body">
                <form class="form-horizontal">

                 <div class="control-group">
              <label class="control-label">Structure budgetaire:</label>
              <div class="controls">
                <select  v-model="formData.structure_budgetaire_id">
            <option v-for="budget in structures_budgetaires" :key="budget.id" 
            :value="budget.id">{{budget.libelle}}</option>
                </select>
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">Code:</label>
              <div class="controls">
                <input type="text" v-model="formData.code" class="span" placeholder="Saisir le code" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Libelle:</label>
              <div class="controls">
                <input type="text" v-model="formData.libelle" class="span" placeholder="Saisir le libelle" />
              </div>
            </div>
            
            

          </form>              
          </div>
           <div class="modal-footer"> 
             <button v-show="formData.code.length && formData.libelle.length 
             && formData.structure_budgetaire_id"
             @click.prevent="ajouterTitreLocal" class="btn btn-primary"
              href="#">Valider</button>
              <button data-dismiss="modal" class="btn" href="#">Fermer</button> </div>
            </div>

<!----- fin modal  ajouter  ---->


<!----- ajouter modal ajouter element enfant   ---->


 <div id="modalAjouterElementEnfant" class="modal hide">
              <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Ajouter plan budgetaire</h3>
              </div>
              <div class="modal-body">
                <form class="form-horizontal">

                   <div class="control-group">
              <label class="control-label">Code parent:</label>
              <div class="controls">
                <input type="text" readonly :value="parentDossier.code" class="span"  />
              </div>
            </div>

             <div class="control-group">
              <label class="control-label">Libéllé parent:</label>
              <div class="controls">
                <input type="text" readonly :value="parentDossier.libelle" class="span"  />
              </div>
            </div>

               <div class="control-group">
              <label class="control-label">Structure budgetaire:</label>
              
              <div class="controls">
              <select v-model="nouvelElementEnfant.structure_budgetaire_id" >
                <option v-for="structure in structures_budgetaires " :key="structure.id" 
                 :value="structure.id">{{structure.libelle}} </option>
              </select>
            </div>
            </div>


            <div class="control-group">
              <label class="control-label">Code:</label>
              <div class="controls">
                <input type="text" v-model="nouvelElementEnfant.code" class="span" placeholder="Saisir le code" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Libelle:</label>
              <div class="controls">
                <input type="text" v-model="nouvelElementEnfant.libelle" class="span" placeholder="Saisir le libelle" />
              </div>
            </div>
           
          </form>              
          </div>
           <div class="modal-footer"> 
             <button v-show="nouvelElementEnfant.code.length && nouvelElementEnfant.libelle.length && 
             nouvelElementEnfant.structure_budgetaire_id"
              @click.prevent="ajouterPlanBudgetaireEnfantLocal()" class="btn btn-primary"
              >Valider</button>
              <a data-dismiss="modal" class="btn" href="#">Fermer</a> </div>
            </div>

<!----- fin modal  ajouter element enfant ---->



<!----- modifier modal debut  ---->

 <div id="modifierModal" class="modal hide">
              <div class="modal-header">
             <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Modifier plan budgetaire</h3>
              </div>
              <div class="modal-body">
                <form class="form-horizontal">

                  <div class="control-group">
              <label class="control-label">Structure budgetaire:</label>
              <div class="controls">
                <select  v-model="editPlanBudgetaire.structure_budgetaire_id">
            <option v-for="budget in structures_budgetaires" :key="budget.id" 
            :value="budget.id">{{budget.libelle}}</option>
                </select>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Code:</label>
              <div class="controls">
                <input type="text" v-model="editPlanBudgetaire.code" class="span" placeholder="" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Libelle:</label>
              <div class="controls">
                <input type="text" v-model="editPlanBudgetaire.libelle" class="span" placeholder="" />
              </div>
            </div>
             

          </form>              
          </div>
           <div class="modal-footer"> 
             <button 
             @click.prevent="modifierLocalisationLocal(editPlanBudgetaire)" class="btn btn-primary"
              >Modifier</button>
              <button data-dismiss="modal" class="btn" >Fermer</button> </div>
            </div>


<!----- fin modifier modal  ---->


<button style="display:none;" v-shortkey.once="['ctrl', 'f']"
  @shortkey="afficherModalAjouterPlanBudgetaire()">Open</button>

 <fab :actions="fabActions"
                main-icon="apps"
          @cache="afficherModalAjouterPlanBudgetaire"
        bg-color="green"

  ></fab>
  
<notifications />


  </div>
  
</template>
   
<script>
//import axios from '../../../../urls/api_parametrage/api'
import {mapGetters, mapActions} from 'vuex'
import Tree from '../administratifs/Tree'
export default {
  components:{
    Tree
  },
  
  data() {
    return {

      json_fields:{
        'Code':'code',
        'Libelle':'libelle',

      },
        fabActions: [
              {
                  name: 'cache',
                  icon: 'add'
              },
              // {
              //     name: 'alertMe',
              //     icon: 'add_alert'
              // }
          ],
          parentDossier:{},
      nouvelElementEnfant: {
        code:"",
        libelle:"",
        structure_budgetaire_id:""



      },

     
        formData : {
                code: "",
             libelle: "",
             structure_budgetaire_id:""
        },

        editPlanBudgetaire: {
            code: "",
             libelle: "",
            structure_budgetaire_id:""
        },
        search:""
    };
  },

 
  created() {
    //this.getSection()
  },
  computed: {
// methode pour maper notre guetter
  ...mapGetters('parametreGenerauxBudgetaire', ['structures_budgetaires', 
  'plans_budgetaires']),
          localisationsFiltre(){

     const searchTerm = this.search.toLowerCase();

return this.plans_budgetaires.filter((item) => {
  
    return item.code.toLowerCase().includes(searchTerm) 
    || item.libelle.toLowerCase().includes(searchTerm)

   
  

   }
)

   },
   lesPlansParents(){
     return this.plans_budgetaires.filter(plan => plan.parent == null)
   },   
  },
  methods: {
    // methode pour notre action
    ...mapActions('parametreGenerauxBudgetaire', ['getPlanBudgetaire', 
    'ajouterPlanBudgetaire', 
   'supprimerPlanBudgetaire', 'modifierPlanbudgetaire']),     
   
    afficherModalAjouterPlanBudgetaire(){
       this.$('#exampleModal').modal({
              backdrop: 'static',
              keyboard: false
             });
    },
   // fonction pour vider l'input
    ajouterTitreLocal () {
      this.ajouterPlanBudgetaire(this.formData)

        this.formData = {
                code: "",
             libelle: "",
          structure_budgetaire_id:""
        }
    },


        ajouterPlanBudgetaireEnfantLocal () {
      // console.log(this.nouvelElementEnfant)
      this.ajouterPlanBudgetaire(this.nouvelElementEnfant)

        this.nouvelElementEnfant = {
                code: "",
             libelle: "",
          structure_budgetaire_id:""
          
        }
    },

     supprimerPlanBudgetaireLocal(item){
      this.supprimerPlanBudgetaire(item.id)
    },


    // afficher modal

 //afficher modal pour ajouter element enfant
	 ajouterElementEnfant(item) {
    this.parentDossier = this.plans_budgetaires.find(plan => plan.id == item.id)
     this.nouvelElementEnfant.parent = this.parentDossier.id

      this.$('#modalAjouterElementEnfant').modal({
              backdrop: 'static',
              keyboard: false
             });

    },

 // fin


 afficherModalModifierPlanBudgetaire(item){

 this.$('#modifierModal').modal({
         backdrop: 'static',
         keyboard: false
        });

  this.editPlanBudgetaire = this.plans_budgetaires.find(plan => plan.id == item.id);


        
 },
// afficher modal
afficherMoadlModifierLocalisation(index){

 this.$('#modifierModal').modal({
         backdrop: 'static',
         keyboard: false
        });

        this.editPlanBudgetaire = this.plans_budgetaires[index];


        
 },
modifierLocalisationLocal(){
  this.modifierPlanbudgetaire(this.editPlanBudgetaire)
  this.$('#modifierModal').modal('hide');
  // this.editPlanBudgetaire = {
  //               code: "",
  //            libelle: "",
  //            structure_budgetaire_id:""
  // }
}

  }
};
</script>

