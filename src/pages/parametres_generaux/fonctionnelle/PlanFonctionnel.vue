
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
                                              title="Liste plan fonctionnel "
                                              name ="Liste plan fonctionnel"
                                              worksheet = "plan fonctionnel"
                                            :data="localisationsFiltre">
                      <i title="Exporter en excel" class="icon-table"> Exporter en excel</i>

                                                 </download-excel> 
                                     </div> <br>
        <div class="widget-box">
             <div class="widget-title"> <span class="icon"> <i class="icon-th"></i> </span>
            <h5>Liste des plans fonctionnelles</h5>
             <div align="right">
        Rechercher: <input type="text" v-model="search">

          </div>
             
          </div>
         
           <div class="widget-content ">
            <!-- <table class="table table-bordered table-striped">
              <thead>
                <tr>
                 <th>Code</th>
                  <th>Libelle</th>
                  <th>Structure fonctionnelles</th>
                   <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr class="odd gradeX" v-for="(plan_fonctionnel, index) 
                in localisationsFiltre" :key="plan_fonctionnel.id">
                  <td @dblclick="afficherMoadlModifierLocalisation(index)">
                    {{plan_fonctionnel.code || 'Non renseigné'}}</td>
                   <td @dblclick="afficherMoadlModifierLocalisation(index)">
                    {{plan_fonctionnel.libelle || 'Non renseigné'}}</td>
                    
                   <td @dblclick="afficherMoadlModifierLocalisation(index)">
                      {{plan_fonctionnel.structure_fonctionnelle.libelle || 'Non renseigné'}}</td>
                  <td>



              <div class="btn-group">
              <button @click.prevent="supprimerPlanFonctionnel(plan_fonctionnel.id)"  class="btn btn-danger ">
                <span class=""><i class="icon-trash"></i></span></button>
             
            </div>

                  </td>
                </tr>
              </tbody>
            </table> -->

                   <ul id="demo">
            <Tree class="item" v-for="plan in lesPlansParents"
            :key="plan.id" :item="plan"   
              @ajouterElementEnfant="ajouterElementEnfant" 
              @supprimer="supprimerPlanFonctionnelLocal"
              @modifier="afficherModalModifierPlanFonctionel"></Tree>
          </ul>
            <div v-if="lesPlansParents.length">
            </div>
            <div v-else>
              <div align="center">
                <h6 style="color:red;">Aucun plan fonctionnel enregistré ! </h6>
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
                <h3>Ajouter plan fonctionnel</h3>
              </div>
              <div class="modal-body">
                <form class="form-horizontal">
                   <div class="control-group">
              <label class="control-label">Structure foctionnelle:</label>
              <div class="controls">
                <select  v-model="formData.structure_fonctionnelle_id">
            <option v-for="plan in structures_fonctionnelles" :key="plan.id" 
            :value="plan.id">{{plan.libelle}}</option>
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
             <button v-show="formData.structure_fonctionnelle_id && 
             formData.code.length && 
             formData.libelle.length"
              @click.prevent="ajouterTitreLocal" class="btn btn-primary"
              >Valider</button>
              <button data-dismiss="modal" class="btn" href="#">Fermer</button> </div>
            </div>

<!----- fin modal  ajouter  ---->

<!----- ajouter modal ajouter element enfant   ---->


 <div id="modalAjouterElementEnfant" class="modal hide">
              <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Ajouter plan programme</h3>
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
              <label class="control-label">Structure fonctionnelle:</label>
              
              <div class="controls">
              <select v-model="nouvelElementEnfant.structure_fonctionnelle_id" >
                <option v-for="structure in structures_fonctionnelles " :key="structure.id" 
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
             nouvelElementEnfant.structure_fonctionnelle_id"
              @click.prevent="ajouterPlanFonctionLocalEnfant()" class="btn btn-primary"
              >Valider</button>
              <a data-dismiss="modal" class="btn" href="#">Fermer</a> </div>
            </div>

<!----- fin modal  ajouter element enfant ---->



<!----- modifier modal debut  ---->

 <div id="modifierModal" class="modal hide">
              <div class="modal-header">
             <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Modifier plan fonctionnel</h3>
              </div>
              <div class="modal-body">
                <form class="form-horizontal">
                   <div class="control-group">
              <label class="control-label">Structure fonctionnel:</label>
              <div class="controls">
                <select  v-model="editPlanFonctionnel.structure_fonctionnelle_id">
            <option v-for="plan in structures_fonctionnelles" :key="plan.id" 
            :value="plan.id">{{plan.libelle}}</option>
                </select>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Code:</label>
              <div class="controls">
                <input type="text" v-model="editPlanFonctionnel.code" class="span" placeholder="" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Libelle:</label>
              <div class="controls">
                <input type="text" v-model="editPlanFonctionnel.libelle" class="span" placeholder="" />
              </div>
            </div>
            

          </form>              
          </div>
           <div class="modal-footer"> 
             <button 
             @click.prevent="modifierLocalisationLocal(editPlanFonctionnel)" class="btn btn-primary"
              >Modifier</button>
              <button data-dismiss="modal" class="btn">Fermer</button> </div>
            </div>


<!----- fin modifier modal  ---->


<button style="display:none;" v-shortkey.once="['ctrl', 'f']"
  @shortkey="afficherModalAjouterplanFonctionnel()">Open</button>

 <fab :actions="fabActions"
                main-icon="apps"
          @cache="afficherModalAjouterplanFonctionnel"
        bg-color="green"

  ></fab>

<notifications  />


  </div>
  
</template>
   
<script>
//import axios from '../../../../urls/api_parametrage/api'
import {mapGetters, mapActions} from 'vuex'
import Tree from '../administratifs/Tree'
export default {
   components: {
    Tree
  },
  data() {
    return {
      json_fields:{
       'Code':'code',
       'Libelle':'libelle',
       'structure fonctionnelle':'structure_fonctionnelle.libelle'

      },

         parentDossier: {},
      nouvelElementEnfant: {
         code: "",
             libelle: "",
          structure_fonctionnelle_id:""
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
     
        formData : {
                code: "",
             libelle: "",
             structure_fonctionnelle_id:""
        },

        editPlanFonctionnel: {
            code: "",
             libelle: "",
             structure_fonctionnelle_id:""
        },
           search:""
    };
  },
 
  created() {
    //this.getSection()
  },
  computed: {
// methode pour maper notre guetter
  ...mapGetters('parametreGenerauxFonctionnelle', ['structures_fonctionnelles', 
  'plans_fonctionnels']),
  
   
     
        localisationsFiltre(){

     const searchTerm = this.search.toLowerCase();

return this.plans_fonctionnels.filter((item) => {
  
    return item.code.toLowerCase().includes(searchTerm) 
    || item.libelle.toLowerCase().includes(searchTerm) 
   
  

   }
)
   },
  lesPlansParents(){
     return this.plans_fonctionnels.filter(plan => plan.parent == null)
   },
  },
  methods: {

       // methode pour notre action
    ...mapActions('parametreGenerauxFonctionnelle', ['getPlanFonctionnelle', 
    'ajouterPlanFonctionnel', 
   'supprimerPlanFonctionnel', 'modifierPlanFonctionnel']), 


     afficherModalAjouterplanFonctionnel(){
       this.$('#exampleModal').modal({
              backdrop: 'static',
              keyboard: false
             });
    },



  // fonction pour vider l'input
    ajouterTitreLocal () {
      this.ajouterPlanFonctionnel(this.formData)

        this.formData = {
                code: "",
             libelle: "",
              structure_fonctionnelle_id:""
        }
    },
         ajouterPlanFonctionLocalEnfant () {
      // console.log(this.nouvelElementEnfant)
      this.ajouterPlanFonctionnel(this.nouvelElementEnfant)

        this.nouvelElementEnfant = {
                code: "",
             libelle: "",
          structure_fonctionnelle_id:""
        }
    },

    supprimerPlanFonctionnelLocal(item){
      this.supprimerPlanFonctionnel(item.id)
    },      
// afficher modal

 //afficher modal pour ajouter element enfant
	 ajouterElementEnfant(item) {
    this.parentDossier = this.plans_fonctionnels.find(plan => plan.id == item.id)
     this.nouvelElementEnfant.parent = this.parentDossier.id

      this.$('#modalAjouterElementEnfant').modal({
              backdrop: 'static',
              keyboard: false
             });

    },

 // fin

afficherModalModifierPlanFonctionel(item){

 this.$('#modifierModal').modal({
         backdrop: 'static',
         keyboard: false
        });

this.editPlanFonctionnel = this.plans_fonctionnels.find(plan => plan.id == item.id);


        
 },


     
   
  
 
// afficher modal
afficherMoadlModifierLocalisation(index){

 this.$('#modifierModal').modal({
         backdrop: 'static',
         keyboard: false
        });

        this.editPlanFonctionnel = this.plans_fonctionnels[index];


        
 },
modifierLocalisationLocal(){
  this.modifierPlanFonctionnel(this.editPlanFonctionnel)
  this.$('#modifierModal').modal('hide');
  // this.editPlanFonctionnel = {
  //               code: "",
  //            libelle: "",
  //            structure_fonctionnelle_id:""
  // }
}

  }
};
</script>

