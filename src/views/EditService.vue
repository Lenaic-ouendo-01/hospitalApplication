<script setup>
import NavigationDrawersHospital from '../components/NavigationDrawersHospital.vue'
import LogOut from '../components/LogOut.vue'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import { 
  mdiChevronLeft, 
  mdiDoctor, 
} from '@mdi/js'
import axios from 'axios';

onMounted(()=>{
  service();
})

const config = {
    headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),    
    }
};

const route = useRoute()

let form = ref({
  name: '',
  description: '',
  opening_hours: '',
  status: ''
})
let router=useRouter()
let drawer= ref(true)
let rail=ref(true)

function service(){
//   const route = useRoute()
  axios
    .get("http://127.0.0.1:8000/api/services/" + route.params.serviceId, config)
    .then(
        (response) =>{
        form.value = response.data.data
        }
    )
    .catch(error => console.log(error));
}

function editService(){
//   const route = useRoute()
  axios
    .put("http://127.0.0.1:8000/api/services/" + route.params.serviceId, {
      "name": form.value.name,
      "description": form.value.description,
      "opening_hours": form.value.opening_hours,
      "status": form.value.status
    }, config)
    .then(response =>{
        //Lors que la modification fonctionne
        console.log(response.data);
        console.log('Mise à jour des données du service');
        router.push({path:'/protected-page/services'});
    })
    .catch(error =>{
        console.error('Erreur lors de la mise à jour du service');
        console.error(error.response.data);
        console.log(error);
    });

}

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
        <v-container fluid class="d-flex justify-center">
          <v-row>
            <v-col>
              <v-card
                class="mx-auto my-10 bg-grey-lighten-2"
                width="400"
              >    
                <v-card-text 
                  class="text-center text-h5"
                >
                  Modification des informations 
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="10"
            >
              <v-text-field
                v-model="form.name"
                variant="outlined"
                label="Nom"
              ></v-text-field>
            </v-col>
            
            <v-col
              cols="12"
              sm="10"
            >
              <v-text-field
                v-model="form.description"
                variant="outlined"
                label="Description du service"
              ></v-text-field>
            </v-col>
        
            <v-col 
              cols="12"
              sm="5"
            >
              <v-text-field
                v-model="form.opening_hours"
                variant="outlined"
                label="Horaire"
                placeholder="xx:xx:xx"
              ></v-text-field>
            </v-col>
        
            <v-col
              cols="12"
              sm="5"
            >
              <v-text-field
                v-model="form.status"
                variant="outlined"
                label="Status"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <!-- <RouterLink to="/protected-page/services"> -->
          <v-btn
            :loading="isUpdating"
            :variant="isUpdating ? 'tonal' : undefined"
            color="blue-grey-lighten-3"
            :prepend-icon="mdiUpdate"
            @click="editService"
          >
            Appliquer
          </v-btn>
        <!-- </RouterLink> -->
      </v-main>

    </v-layout>
  </v-card>
</template>

<style scoped>
  .route{
    text-decoration: none;
  }
</style>