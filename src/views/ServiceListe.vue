<script setup>
import NavigationDrawersHospital from '../components/NavigationDrawersHospital.vue'
import LogOut from '../components/LogOut.vue'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import { 
mdiAccountPlus,
  mdiCarBrakeAlert,
  mdiChevronLeft, 
  mdiMagnify, 
} from '@mdi/js'
import axios from 'axios';
import { useMeStore } from '../stores/me.store';

onMounted(()=>{
  listService();
  authUser.me()          //**************************************************** */
  console.log(authUser.user.data)          //********************************* */
})

let drawer= ref(true)
let rail=ref(true)
let infoUser =ref({})
let searchValue = ref('')
let services = ref("")
let dialog=ref(false)
let router=useRouter()

const authUser = useMeStore()      /***************************************** */

const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};

function listService() {
    axios
  .get('http://127.0.0.1:8000/api/services', config)
  .then(
    (reponse) => {
      services.value = reponse.data.data
      console.log(services.value)
    }
  )
  .catch(erreur => console.log(erreur));
}

function deleteService(serviceId) {
    axios
      .delete('http://127.0.0.1:8000/api/services/' + serviceId, config)
      .then(
        router.push({path: '/protected-page/services'})
      )
      .catch(erreur => console.log(erreur));
}

// function search(){
//   if(searchValue.value.trim().length > 0) {
//     axios
//       .get('https://restcountries.com/v3.1/name/' + searchValue.value)
//       .then(
//         (reponse) => {
//           pays.value = reponse.data
//           console.log(pays.value)
//         }
//       )
//   }
// }
  
</script>
<template>
    
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item 
          prepend-avatar="https://th.bing.com/th/id/R.6035ac84041991e738c514bbf7301c4f?rik=tIIlwfNMtPyhbw&riu=http%3a%2f%2fval-revermont.fr%2fwordpress%2fwp-content%2fuploads%2f2018%2f07%2fMedecin.jpg&ehk=uYtLlYVRCDqJvPOLoa8L27yj6tUSOIu3wd0ZgfaMYAU%3d&risl=&pid=ImgRaw&r=0"
          :title="infoUser.name"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              :icon="mdiChevronLeft"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <NavigationDrawersHospital></NavigationDrawersHospital>
        
        <template v-slot:append>
          <LogOut></LogOut>
        </template>

      </v-navigation-drawer>
      <v-main style="min-height:1000px ;">
        <div>
          <v-icon icon="mdi" color="primary"/>
          <v-text-field
            :prepend-icon="mdiMagnify" 
            label="Rechercher un service..." 
            v-model="searchValue" 
            @keyup.enter="search"
          ></v-text-field>
          <button @click="listService" v-show="searchValue.trim().length > 0" id="but">Réinitialiser</button>
        </div>
        <v-table
          fixed-header
        >
          <thead>
            <tr>
              <th class="text-left">
                Nom
              </th>
              <th class="text-left">
                Description
              </th>
              <th class="text-left">
                Horaire
              </th>
              <th class="text-left">
                Status
              </th>
              <th class="text-center">
                Action
              </th>
            </tr>
            
          </thead>
          <tbody>
            <v-alert
              border="start"
              border-color="deep-purple accent-4"
              elevation="6"
              min-width="160px"
            >
              <v-btn
                :prepend-icon="mdiAccountPlus"
                @click="createService"
              >
                <RouterLink to="/protected-page/services/add-service" class="route">
                  Ajouter 
                </RouterLink>
              </v-btn>
            </v-alert>

            <tr
              v-for="(service, index) in services"
              :key="index"
            >
              <td>{{ service.name }}</td>
              <td>{{ service.description }}</td>
              <td>{{ service.opening_hours }}</td>
              <td>{{ service.status }}</td>
              <td class="">
              <RouterLink :to="{name: 'editService', params:{serviceId: service.id}}">
                <td>
                  <v-btn class="bg-primary">Modifier</v-btn>
                </td>
              </RouterLink>
                <td>
                  <v-btn 
                    class="bg-red ma-2" 
                    @click="dialog = true"
                  >Supprimer</v-btn>
                  <v-snackbar
                    v-model="dialog"
                  >
                    <div class="text-h4 pb-2" :prepend-icon="mdiCarBrakeAlert">Attention</div>
                    <p>Souhaitez-vous vraiment supprimer ce service ?</p>
                    
                    <template v-slot:actions>
                      
                    <RouterLink to="/protected-page" >
                      <v-btn
                        class="text-danger"
                        color="black.0"
                        variant="text"
                        @click="deleteService(service.id), dialog = false"
                      >
                        Oui
                      </v-btn>
                    </RouterLink>
                    
                    <v-btn
                      color="black.0"
                      variant="text"
                      @click="dialog = false"
                    >
                      Fermer
                    </v-btn>
                    </template>
                  </v-snackbar>
                </td>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-main>
    </v-layout>
  </v-card>
  <RouterView/>
</template>

<style scoped>
  .route{
    text-decoration: none;
  }
</style>