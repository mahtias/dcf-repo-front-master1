<template>
   <div class="container-fluid">
        <hr>
    <div class="row-fluid">
      <div class="span12">
      <div class="widget-box">
          <div class="widget-title">
            <ul class="nav nav-tabs">
              <li class="active"><a data-toggle="tab" href="#tab1">Ajouter engagement</a></li>
              <!-- <li><a data-toggle="tab" href="#tab2"></a></li> -->
              <!-- <li><a data-toggle="tab" href="#tab3">Decision de cf</a></li> -->
            </ul>
          </div>
          <div class="widget-content tab-content">
            <div id="tab1" class="tab-pane active">

                  
           
                  <table border="0px">
               
                      
                          <tr>
                  <td style="width:3px;"> 
            <div class="control-group">
              <label class="control-label"> procedure:</label>
              <div class="controls">
           <select v-model="formData.procedure" class="span">
               <option v-for="procedure in procedures" :key="procedure.id" 
               :value="procedure.id">{{procedure.libelle}}</option>
           </select>
              </div>
            </div>
             </td>

               <td>
            <div class="control-group">
                                <label class="control-label">Année Budgetaire</label>
                                <div class="controls">
                             <select v-model="formData.exercice_budgetaire" class="span">
                           <option v-for="exoBudget in exoEnCours" :key="exoBudget.id"
                           :value="exoBudget.id" >{{exoBudget.annee}}</option>
                             </select>
                                </div>
                                </div>
              </td>   


                 <td>
                      <div class="control-group">
                                <label class="control-label">Section:</label>
                                <div class="controls">
                             <select v-model="formData.section" class="span">
                           <option v-for="section in sections" :key="section.id"
                           :value="section.id" >{{section.nom_section}}</option>
                             </select>
                                </div>
                                </div>
              </td>    

              <td>
                      <div class="control-group">
                                <label class="control-label" title="nature de section">N.section:</label>
                                <div class="controls">
                             <select v-model="formData.nature_section" class="span">
                           <option v-for="nature in natures_sections" :key="nature.id"
                           :value="nature.id" >{{nature.libelle}}</option>
                             </select>
                                </div>
                                </div>


                          </td> 


                             <td>
                      <div class="control-group">
                                <label class="control-label">Titre:</label>
                                <div class="controls">
                             <select v-model="formData.titre" class="span">
                           <option v-for="titre in titres" :key="titre.id"
                           :value="titre.id" >{{titre.libelle}}</option>
                             </select>
                                </div>
                                </div>
                                 </td>    



                                      <td>
                            <div class="control-group">
                                <label class="control-label">Marché:</label>
                                <div class="controls">
                             <select v-model="formData.marche" class="span">
                           <option v-for="marche in marche_contrats" :key="marche.id"
                           :value="marche.id" >{{marche.livrable_prevu}}</option>
                             </select>
                                </div>
                                </div>
                                 </td>
                                </tr>


                          <tr>
 
    
         

                          
                        <td>         
                  
               <div class="control-group">
              <label class="control-label" title="Service de demandeur">S.demandeur:</label>
              <div class="controls">
                <input type="text" v-model="formData.service_demandeur" 
                class="span"  />
                </div>
                  </div>
                              </td> 

                              <td>         
                  
               <div class="control-group">
              <label class="control-label">Objet d'engagement:</label>
              <div class="controls">
                <input type="text" v-model="formData.objet" 
                class="span"  />
                </div>
                  </div>
                              </td>
                        

                         <td style="width:;">           
               <div class="control-group">
              <label class="control-label">Date de demande:</label>
              <div class="controls">
                <input type="date" v-model="formData.date_demande" 
                class="span"/>
              </div>
                </div>
                </td>


                    <td style="width:;">           
               <div class="control-group">
              <label class="control-label" title="numero de facture proforma">N.F. proforma:</label>
              <div class="controls">
                <input type="number" v-model="formData.Numero_facture_proforma" 
                class="span"/>
              </div>
                </div>
                </td>

                              <td>           
               <div class="control-group">
              <label class="control-label">N° demandeur:</label>
              <div class="controls">
               <input type="number" v-model="formData.numero_demande" class="span"/>
              </div>
                </div>   
                    </td>

                               <td>           
               <div class="control-group">
              <label class="control-label">Date reception:</label>
              <div class="controls">
               <input type="number" v-model="formData.date_reception " class="span" />
              </div>
            </div> 
                    </td>

                          </tr>

                         <tr>

                        
                 <td>           
               <div class="control-group">
              <label class="control-label">N°engagement:</label>
              <div class="controls">
               <input type="number" v-model="formData.numero_engagement" class="span" />
              </div>
            </div> 
                    </td> 

                 <td>           
               <div class="control-group">
              <label class="control-label">Montant engagement:</label>
              <div class="controls">
               <input type="number" v-model="formData.montant_engage " class="span" />
              </div>
            </div> 
                    </td> 

                    <td>           
               <div class="control-group">
              <label class="control-label">Ligne budgetaire:</label>
              <div class="controls">
               <input type="number" v-model="formData.ligne_budgetaire " class="span" />
              </div>
            </div> 
                    </td>

                     <td>           
               <div class="control-group">
              <label class="control-label" title="cumul engagement">C. engagement:</label>
              <div class="controls">
               <input type="number" v-model="formData.cumul_engage " class="span" />
              </div>
            </div> 
                    </td>
                          

                       <td>           
               <div class="control-group">
              <label class="control-label">Disponible:</label>
              <div class="controls">
               <input type="number" v-model="formData.disponible " class="span" />
              </div>
            </div> 
                    </td>

                          <td>           
               <div class="control-group">
              <label class="control-label">N bordereau:</label>
              <div class="controls">
               <input type="number" v-model="formData.numero_bordereau " class="span" />
              </div>
            </div> 
                    </td>

                         </tr>

                         <tr>

                

                      <td>           
               <div class="control-group">
              <label class="control-label">Date cotation:</label>
              <div class="controls">
               <input type="date" v-model="formData.date_demande_cotation" class="span" />
              </div>
            </div> 
                    </td> 

                 <td>           
               <div class="control-group">
              <label class="control-label">Date selection:</label>
              <div class="controls">
               <input type="date" v-model="formData.date_selection " class="span" />
              </div>
            </div> 
                    </td> 

                    <td>           
               <div class="control-group">
              <label class="control-label">Date ordonnateur:</label>
              <div class="controls">
               <input type="date" v-model="formData.date_ordonnateur " class="span" />
              </div>
            </div> 
                    </td>

                     <td>           
               <div class="control-group">
              <label class="control-label" title="Mode de paiement">M.paiement:</label>
              <div class="controls">
               <select  v-model="formData.mode_paiement " class="span" >
               <option value="0">Virement</option>
               <option value="1">Chèque</option>
               <option value="2">Espèce</option>
               </select>
              </div>
            </div> 
                    </td>
                          

                       <td>           
               <div class="control-group">
              <label class="control-label" title="Numero du mandat">N. mandat:</label>
              <div class="controls">
               <input type="number" v-model="formData.numero_mandat " class="span" />
              </div>
            </div> 
                    </td>

                     <div class="control-group">
              <label class="control-label">Fichier joint:</label>
              <div class="controls">
                <input type="file" id="file"  @change="onFichierChange" />
              </div>
            </div>

                         </tr>
         

                 




               

          
                         

                       </table> 
         
            
                 
            
                </div>
            <!-- <div id="tab2" class="tab-pane">
                  <table border="0px">
    
                

                     
                           <tr>

                        
                           </tr>
       
            </table> 
            </div> -->
            <div id="tab3" class="tab-pane">
                  
                  <table border="0px">
                          <tr>

                         
                    

                      

                          </tr>
                          
                             
                
       
                      </table> 

                    </div>

         

              </div>
               </div>

             </div>

                </div>
           <div align="right">
             <button
              @click.prevent="ajouterEngagementLocal" class="btn btn-primary"
              href="#">Valider</button> &nbsp;&nbsp;&nbsp;
              <button @click.prevent="AllerPageListe" data-dismiss="modal" class="btn" href="#">Fermer</button> 
                </div>


<!-- <button style="display:none;" v-shortkey.once="['ctrl', 'f']"
  @shortkey="tab()">Open</button>

 <fab :actions="fabActions"
                main-icon="apps"
          @cache="tab"
        bg-color="green"

  ></fab> -->

<notifications  />


               
   </div>
</template>

   
<script>
//import axios from '../../../../urls/api_parametrage/api'
import {mapGetters, mapActions} from 'vuex'
export default {
  
  data() {

    
    return {
      
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
     
        formData : {},
        fonctionActeur:""
        
             
         
    };
  },

 
  created() {
    //  this.getStructureActivite()
   // console.log(this.formData.ua_id)
  },
  computed: {
// methode pour maper notre guetter
   ...mapGetters('suivi_engagement_mandat', ['engagements','procedures']) ,
  ...mapGetters('parametreGenerauxAdministratif', ['titres', 'sections','natures_sections','exercices_budgetaires']),
  ...mapGetters('gestionMarche', ['marche_contrats']),
  



exoEnCours(){
return this.exercices_budgetaires.filter(element => element.encours == 1)
},

  },

  methods:{
...mapActions('suivi_engagement_mandat', ['ajouterEngagement']),



    onFichierChange(e){
      this.formData.fichier_joint = e.target.files[0]
    },



ajouterEngagementLocal(){
this.ajouterEngagement(this.formData)
 this.formData = {
  date_demande:"",
  objet:"",
  service_demandeur:"",
  numero_demande:"",
  numero_engagement:"",
  annee:"",
  libelle:"",
  fichier_joint:"",
  Numero_facture_proforma:"",
  date_reception:"",
  montant_engage:"",
  ligne_budgetaire:"",
  cumul_engage:"",
  disponible:"",
  numero_bordereau:"",
  date_demande_cotation:"",
  date_selection:"",
  date_ordonnateur:"",
  mode_paiement:"",
  numero_mandat:""


 }


},
AllerPageListe(){
  this.$router.push({
    name:'Engagement'
  })
},
  },
};
</script>