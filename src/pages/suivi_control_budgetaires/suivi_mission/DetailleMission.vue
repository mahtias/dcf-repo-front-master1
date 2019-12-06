<template>
   <div class="container-fluid">
        <hr>
    <div class="row-fluid">
      <div class="span12">
      <div class="widget-box">
          <div class="widget-title">
            <ul class="nav nav-tabs">
              <li class="active"><a data-toggle="tab" href="#tab1">Detail de mission</a></li>
              <li><a data-toggle="tab" href="#tab2">Historique de decision du cf</a></li>
             
            </ul>
          </div>
          <div class="widget-content tab-content">
            <div id="tab1" class="tab-pane active">

                  
               <table class="table table-bordered table-striped">
              <thead>
                <tr>
                   <th>Exercice budgetaires</th>
                  <th> Categorie mission</th>
                   <th>Objet</th>
                  <th> Type de mission</th>
                  <th>Date de mission</th>
                  <th>Date de depart</th>
                  <th>UA</th>
                  <th>Acte personnel</th>
                </tr>
              </thead>
              <tbody>                          
                <tr class="odd gradeX" >
                  <td >
                     {{mission.objetExerciceBudegetaire.annee}}</td> 
                  <td>
                      {{mission.categorie_mission.libelle || 'Non renseigné'}}</td> 
                 <td >
                      {{mission.objet || 'Non renseigné'}}</td>

                    <td >
                      {{mission.type_mission || 'Non renseigné'}}</td>

                      <td >
                      {{formaterDate(mission.date_mission) || 'Non renseigné'}}</td>

                 <td >
                      {{formaterDate(mission.date_depart) || 'Non renseigné'}}</td>
                      
                       <td >
                      {{mission.objetUniteAdministrative.libelle || 'Non renseigné'}}</td>
                            
                    <td >
                     {{mission.objetActeurDepense.matricule}}</td> 
                    
                </tr>
              </tbody>
            </table>
         

         <!---  debut du deuxieme tableau de detail de mission --->

           <table class="table table-bordered table-striped">
              <thead>
                <tr>

                   <th>Mode de paiment</th>
                   <th>Frais de restauration</th>
                  <th>Frais d'hebergement</th>
                  <th>frais de deplacement</th>
                  <th> Autre frais</th>
                  <th>Signataire</th>
                  <th> Cout de billet avion</th>
                  <th>fichier joint</th>
                </tr>
              </thead>
              <tbody>
                <tr class="odd gradeX" >
               
                <td >
                  <span
                       v-if="mission.mode_paiement == 0" > virement
                  </span>
                  <span 
                         v-else-if="mission.mode_paiement == 1" > chèque </span>

                         <span v-else> espèce </span>   
                   
                  </td> 
                
                 <td >  {{formatageSomme(parseFloat(mission.frais_restauration)) || 'Non renseigné'}}</td>

                   
                 <td > {{formatageSomme(parseFloat(mission.frais_hebergement)) || 'Non renseigné'}}</td>

                      
                 <td >{{formatageSomme(parseFloat(mission.frais_deplacement)) || 'Non renseigné'}}</td>
                      
                    
                      <td > {{formatageSomme(parseFloat( mission.autre_frais)) || 'Non renseigné'}}</td>

                    
                     <td > {{mission.signataire || 'Non renseigné'}}</td>

                     <td > {{formatageSomme(parseFloat(mission.cout_billet_avion)) || 'Non renseigné'}}</td> 
                      
                      <td > {{mission.fichier_joint || 'Non renseigné'}}</td>

                           
                

                </tr>
              </tbody>
            </table>

         <!--- fin du deuxieme tableau de detail de mission  -->
              
                 

                 <!-- debut du troisieme tableau de detail de mission  -->

                     
         <table class="table table-bordered table-striped">
              <thead>
                <tr>

                   <th>Date de retour</th>
                   <th>Duree</th>
                  <th>Numero autorisation</th>
                  <th>Numero ccm</th>
                  <th>Classe voyage</th>
                  <th>Cout total de la mission</th>
                  <th>Destination</th>
                   <th>Itineraire retenu</th>
                    <th>Moyen de transport</th>
                
                </tr>
              </thead>
              <tbody>
                <tr class="odd gradeX" >
             
                 <td > {{formaterDate(mission.date_retour) || 'Non renseigné'}}</td> 
                
                  <td>{{mission.duree || 'Non renseigné'}}</td>

                    
                  <td >{{mission.numero_autorisation || 'Non renseigné'}}</td>

                    
                    <td >  {{mission.numero_ccm || 'Non renseigné'}}</td>

                
                     <td > {{mission.classe_voyage || 'Non renseigné'}}</td>
                      
                      
                     <td > {{formatageSomme(parseFloat(mission.cout_total)) || 'Non renseigné'}}</td>

                        
                     <td > {{mission.destination || 'Non renseigné'}}</td>

                       
                     <td > {{mission.itineraire_retenu || 'Non renseigné'}}</td>
                        


                        <td  >
                            <span 
                             v-if="mission.moyen_transport == 0"> vehicule</span>
                              <span v-else-if="mission.moyen_transport == 1"  > Avion</span>
                            
                          <span v-else >Train</span>
    
                          </td>
                   
                    
                
                </tr>
              </tbody>
            </table>
                 <!--fin du troisieme tableau de detail de mission -->
            
                </div>


                    <!---- debut du tableau historique de mission  --->
 
                        <div id="tab2" class="tab-pane">
                           <div class="container-fluid">
                                      <div class="row-fluid">
                                        <div class="span12">
                                            <div>

                                        <download-excel
                                            class="btn btn-default pull-right"
                                            style="cursor:pointer;"
                                              :fields = "json_fields"
                                              title="Liste des historiques de missions"
                                              name ="Liste des missions"
                                              worksheet = "Missions"
                                            :data="historiques_missions">
                      <i title="Exporter en excel" class="icon-table"> Exporter en excel</i>

                                                 </download-excel> 
                                     </div> <br>
        <div class="widget-box">
             <div class="widget-title"> <span class="icon"> <i class="icon-th"></i> </span>
            <h5>Liste des historiques de missions</h5>
             <div align="right">
          </div>
             
          </div>
         
           <div class="widget-content nopadding">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                    <th>Type operation</th>
                     <th>Date operation</th>
                     <th>Motif</th>
                     <th>Observation</th>
                      <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="historique">
                <tr class="odd gradeX" v-for="(historiqueMission, index) in 
                historique"
                 :key="historiqueMission.id">

                  <td  @dblclick="afficherModalModifierHistoriqueMission(index)" >
                     <span 
                     v-if="historiqueMission.type_operation == 0" > visé </span>
                     <span v-else-if="historiqueMission.type_operation == 1" >Differé</span>
                     <span v-else >Rejeté </span>
                      <!-- {{historiqueMission.type_operation || 'Non renseigné'}} -->
                      </td>

                  <td @dblclick="afficherModalModifierHistoriqueMission(index)">
                      {{formaterDate(historiqueMission.date_operation) || 'Non renseigné'}}</td>

                        <td @dblclick="afficherModalModifierHistoriqueMission(index)">
                      {{historiqueMission.motif || 'Non renseigné'}}</td>

                        <td @dblclick="afficherModalModifierHistoriqueMission(index)">
                      {{historiqueMission.observation || 'Non renseigné'}}</td>
                   
                  <td>



              <div class="btn-group">
              <button @click.prevent="supprimerHistoriqueMission(historiqueMission.id)"  class="btn btn-danger ">
                <span class=""><i class="icon-trash"></i></span></button>
             
            </div>

                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="historique.length">    
            </div>
            <div v-else>
              <div align="center">
                <h6 style="color:red;">Aucune historique de mission enregistrée </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
              </div>
            </div>
            </div>
            
              </div>
               </div>

             </div>

                </div>
                <div align="right">
           
             
              <button @click.prevent="AllerAPageListe" data-dismiss="modal" class="icon icon-arrow-left" title="retour sur liste mission">Retour</button> 
                </div>
             
   </div>
</template>

   
<script>

import {mapGetters, mapActions} from 'vuex'
import {formatageSomme} from '../../../Repositories/Repository'
import moment from "moment";

export default {
    data(){
    return{
      json_fields:{
      'Type operation': 'type_operation',
      'Date operation': 'date_operation'
      },
     historique:"",

        mission: undefined
    }
},
 created(){
 this.mission = this.getMissionPersonnaliser.find(
   mission => mission.id == this.$route.params.id_mission
 )
this.historique = this.historiques_missions.filter(mission => mission.mission == this.$route.params.id_mission)
},


 computed: {
// methode pour maper notre guetter
   ...mapGetters('suivi_controle_budgetaire', ['getMissionPersonnaliser', 'historiques_missions'])
   
  },


// historiqueMissionfiltre(){
// const searchHistorique = this.search.toLowerCase();
// return this.historiques_missions.filter((item) => {
//   return item.type_operation.toLowerCase().includes(searchHistorique)
// })
// },


  methods:{

    ...mapActions('suivi_controle_budgetaire' , ['supprimerHistoriqueMission']),

     AllerAPageListe(){
  
    this.$router.push({
        name: 'Mission'
    })
    },
    formatageSomme:formatageSomme,


// afficherModalModifierHistoriqueMission(){

// this.$('#modifierModal').modal({
//          backdrop: 'static',
//          keyboard: false
//         });
//         this.editHistoriqueMission = this.historiques_missions[index]

// },

    // formater la date
 formaterDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
  }
}
</script>