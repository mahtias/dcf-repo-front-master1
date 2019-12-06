
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
                                              title="Liste des Missions "
                                              name ="Liste des missions"
                                              worksheet = "Missions"
                                            :data="engagements">
                      <i title="Exporter en excel" class="icon-table"> Exporter en excel</i>

                                                 </download-excel> 
                                     </div> <br>
        <div class="widget-box">
             <div class="widget-title"> <span class="icon"> <i class="icon-th"></i> </span>
            <h5>Liste engagement</h5>
             <div align="right">
        Rechercher: <input type="text" v-model="search">

          </div>
             
          </div>
         
           <div class="widget-content nopadding">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                    <th>Code</th>
                  <th>Libelle</th>
                   <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr class="odd gradeX" v-for="(activites, index) in 
                engagements"
                 :key="activites.id">
                  <td @dblclick="afficherModalModifierBudgetaire(index)">
                      {{activites.code || 'Non renseigné'}}</td>
                  <td @dblclick="afficherModalModifierBudgetaire(index)">
                      {{activites.libelle || 'Non renseigné'}}</td>
                   
                  <td>



              <div class="btn-group">
              <button @click.prevent="supprimerCategorieMission(activites.id)"  class="btn btn-danger ">
                <span class=""><i class="icon-trash"></i></span></button>
             
            </div>

                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <div v-if="engagements.length">    
            </div>
            <div v-else>
              <div align="center">
                <h6 style="color:red;">Aucun engagement enregistré </h6>
              </div>
            </div> -->
          </div>
        </div>
      </div>
              </div>
            </div>







 <fab :actions="fabActions"
                main-icon="apps"

          @cache="AllerPageAjouterEngagement"
        bg-color="green"

  ></fab>

<notifications />


  </div>
  
</template>
   
<script>
//import axios from '../../../../urls/api_parametrage/api'
import {mapGetters, mapActions} from 'vuex'

export default {
  
  data() {
    return {
      json_fields:{
             'Libelle':'libelle',
             'Code':'code'
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

                code:"",
             libelle: "",
            
        },

        editBudgetaire: {
            code:"",
             libelle: "",
            
        },
            search:""
    };
  },

 
  created() {
    //  this.getStructureActivite()
  },
  computed: {
// methode pour maper notre guetter
   ...mapGetters('suivi_engagement_mandat', ['engagements']) ,
   
    // methode pour trier un item
//            engagements(){

//      const searchTerm = this.search.toLowerCase();

// return this.engagements.filter((item) => {
  
//      return item.libelle.toLowerCase().includes(searchTerm) 
    

  
  

//    }
// )
//    }
  },

  methods: {
    // methode pour notre action
   ...mapActions('suivi_engagement_mandat', []),   
   
    afficherModalAjouterCategorieMission(){
       this.$('#exampleModal').modal({
              backdrop: 'static',
              keyboard: false
             });
    },
   // fonction pour vider l'input
     ajouterBudgetaireLocal () {
     this.ajouterCategorieMission(this.formData)

        this.formData = {
             code:"",
            libelle: "",
            
         }
     },
// afficher modal
afficherModalModifierBudgetaire(index){

 this.$('#modifierModal').modal({
         backdrop: 'static',
         keyboard: false
        });

        this.editBudgetaire = this.engagements[index];


        
 },
// 
modifierBudgetaireLocal(){
  this.modifierCategorieMission(this.editBudgetaire)
  this.$('#modifierModal').modal('hide');
  // this.editBudgetaire = {
  //   code:"",
  //   libelle:"",
   
  // }
},
 AllerPageAjouterEngagement(){
    

    this.$router.push({
        name: 'AjouterEngagement'
    })
    },

  }
};
</script>

