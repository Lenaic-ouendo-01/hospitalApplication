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
  authUser.me();
  console.log(authUser.user.data);
  listDoctor();
})

let drawer= ref(true)
let rail=ref(true)
let searchValue = ref('')
let doctors = ref("")

const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};

const authUser = useMeStore();

function listDoctor() {
  axios
    .get('http://127.0.0.1:8000/api/users?role=DIRECTOR', config)
    .then(
      (reponse) => {
        doctors.value = reponse.data.data
        console.log(doctors.value)
      }
    )
    .catch(erreur => console.log(erreur));
}

let sup=ref("")
function deleteDoctor(doctorId) {
  axios
    .delete('http://127.0.0.1:8000/api/users/' + doctorId, config)
    .then(res => console.log(res))
    .catch(erreur => console.log(erreur));
}

// function search(){
//     if(searchValue.value.trim().length > 0) {
//       axios
//         .get('https://restcountries.com/v3.1/name/' + searchValue.value)
//         .then(
//           (reponse) => {
//             pays.value = reponse.data
//             console.log(pays.value)
//           }
//         )
//     }
//   }
  
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
          :title="authUser.user.name"
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
            label="Rechercher un médecin..." 
            v-model="searchValue" 
            @keyup.enter="search"
          ></v-text-field>
          <button @click="listDoctor" v-show="searchValue.trim().length > 0" id="but">Réinitialiser</button>
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
                Email
              </th>
              <th class="text-left">
                Contact
              </th>
              <th class="text-left">
                Sexe
              </th>
              <!-- <th class="text-left">
                Langue
              </th> -->
              <th class="text-left">
                Nationalité
              </th>
              <!-- <th class="text-left">
                Date de naissance
              </th> -->
              <th class="text-left">
                Action
              </th>
            </tr>
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
                <RouterLink to="/protected-page/carers/add-carer" class="route">
                  Ajouter 
                </RouterLink>
              </v-btn>
            </v-alert>
          </thead>
          <tbody>
            <tr
              v-for="(doctor, index) in doctors"
              :key="index"
            >
              <td>{{ doctor.name }}</td>
              <td>{{ doctor.email }}</td>
              <td>{{ doctor.phoneNumber }}</td>
              <td>{{ doctor.sex }}</td>
              <!-- <td>{{ doctor.language }}</td> -->
              <td>{{ doctor.nationality }}</td>
              <!-- <td>{{ doctor.birth }}</td> -->
              <RouterLink :to="{name: 'editCarer', params:{doctorId: doctor.id}}">
                <td>
                  <v-btn class="bg-primary">Modifier</v-btn>
                </td>
              </RouterLink>

              <!-- <RouterLink :to="{name: 'editCarer', params:{doctorId: doctor.id}}">
                <td>
                  <v-btn class="bg-primary">Associer service</v-btn>
                </td>
              </RouterLink> -->
              <!-- <td>
                <v-btn 
                  class="bg-red" 
                  @click="dialog = true"
                >Supprimer</v-btn>
                <v-snackbar
                  v-model="dialog"
                  >
                  <div class="text-h4 pb-2" :prepend-icon="mdiCarBrakeAlert">Attention</div>
                  <p>Souhaitez-vous vraiment supprimer ce médecin ?</p>
                  
                  <template v-slot:actions>
                    
                    <v-btn
                      class="text-danger"
                      color="black.0"
                      variant="text"
                      @click="deleteDoctor(doctor.id), dialog = false"
                    >
                      Oui
                    </v-btn>
                    
                    <v-btn
                      color="black.0"
                      variant="text"
                      @click="dialog = false"
                    >
                      Fermer
                    </v-btn>
                  </template>
                </v-snackbar>
              </td> -->
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