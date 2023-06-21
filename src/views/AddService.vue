<script setup>
import NavigationDrawersHospital from '../components/NavigationDrawersHospital.vue'
import { onMounted, ref } from 'vue';
import LogOut from '../components/LogOut.vue';
import { useRouter } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import { useMeStore } from '../stores/me.store';
import { 
  mdiChevronLeft, 
  mdiDoctor, 
} from '@mdi/js'
import axios from 'axios';

onMounted(()=>{
    authUser.me()
    console.log(authUser.user.data)
})


let name = ref("")
let drawer= ref(true)
let rail=ref(true)
let description  =ref("")
let opening_hours = ref("")
let status = ref("")
let router=useRouter()

const authUser = useMeStore();
const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};

function createService(){
    axios
    .post("http://127.0.0.1:8000/api/services",{
        "name": name.value,
        "description": description.value,
        "opening_hours": opening_hours.value,
        "status": status.value
    },config)
    .then(
        (response) =>{
          console.log(response)
          router.push({path: '/protected-page/services'});
        }
    )
    .catch(error => console.log(error));
    }

</script>

<template>
  <center class="ma-16" v-if="authUser.user.isLoading == true">
    <v-progress-circular 
      indeterminate 
      :size="67" 
      :width="6" 
    >
    </v-progress-circular>
  </center>

  <v-card v-else>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item 
          prepend-avatar="https://th.bing.com/th/id/R.6035ac84041991e738c514bbf7301c4f?rik=tIIlwfNMtPyhbw&riu=http%3a%2f%2fval-revermont.fr%2fwordpress%2fwp-content%2fuploads%2f2018%2f07%2fMedecin.jpg&ehk=uYtLlYVRCDqJvPOLoa8L27yj6tUSOIu3wd0ZgfaMYAU%3d&risl=&pid=ImgRaw&r=0"
          :title="authUser.user.data.name"
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
            <v-col cols="" sm="7">
              <v-card
                class="mx-auto my-10"
                width="400"
              >    
                <v-card-text 
                  class="text-center text-h5"
                >
                  Nouveau service...  
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="name"
                label="Nom service"
                variant="outlined"
              ></v-text-field>
            </v-col>
        
            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="description"
                label="Description"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="opening_hours"
                label="Horaire"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="status"
                label="Status"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-btn
          :loading="isUpdating"
          :variant="isUpdating ? 'tonal' : undefined"
          color="blue-grey-lighten-3"
          :prepend-icon="mdiUpdate"
          @click="createService"
        >
          Ajouter
        </v-btn>
      </v-main>
    </v-layout>
  </v-card>

</template>

<style scoped>
  .route{
    text-decoration: none;
  }
</style>