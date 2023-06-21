<script setup>
import NavigationDrawersHospital from '../components/NavigationDrawersHospital.vue'
import LogOut from '../components/LogOut.vue'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import { useMeStore } from '../stores/me.store';
import axios from 'axios';
import { 
  mdiChevronLeft, 
  mdiDoctor,
  mdiUpdate, 
} from '@mdi/js';


onMounted(()=>{
    authUser.me()
    console.log(authUser.user.data)
})

const authUser = useMeStore();
const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};

let router=useRouter()
let rules = ref ({
  required: value => !!value || 'Required.',
  counter: value => value.length <= 20 || 'Max 20 characters',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  },
});
let form = ref({
  name: '',
  description: '',
  number_fix: '+229 ',
  email: '',
  address: '',
  city: '',
  number_mobile: '+229 ',
  number_urgence: '+229 ',
  hours: '',
  language: ''
})
let drawer= ref(true)
let rail=ref(true)


function createHospital() {
  axios
    .post('http://127.0.0.1:8000/api/hospitals', {
      "name": form.value.name,
      "description": form.value.description,
      "number_fix": form.value.number_fix,
      "email": form.value.email,
      "address": form.value.address,
      "city": form.value.city,
      "number_mobile": form.value.number_mobile,
      "number_urgence": form.value.number_urgence,
      "hours": form.value.hours,
      "language": form.value.language,          
    }, config)
    .then(
      (reponse) => {
        console.log(reponse)
        router.push({path: '/protected-page/hospital'});
      }
    )
    .catch(erreur => console.log(erreur));

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
            <!-- <v-col>
              <v-card
                class="mx-auto my-10 bg-grey-lighten-2"
                width="400"
              >    
                <v-card-text 
                  class="text-center text-h5"
                >
                  
                </v-card-text>
              </v-card>
            </v-col> -->
            <v-col
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.name"
                variant="solo-filled"
                label="Nom de l'hôpital"
              ></v-text-field>
            </v-col>
            
            <v-col
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.email"
                variant="solo-filled"
                :rules="[rules.required, rules.email]"
                label="Email"
              ></v-text-field>
            </v-col>
        
            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.number_fix"
                variant="solo-filled"
                label="Numéro Fix"
              ></v-text-field>
            </v-col>

            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.number_urgence"
                variant="solo-filled"
                label="Numéro d'urgence"
              ></v-text-field>
            </v-col>

            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.number_mobile"
                variant="solo-filled"
                label="Numéro mobile"
              ></v-text-field>
            </v-col>
        
            <v-col
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.address"
                variant="solo-filled"
                label="Adresse de l'hôpital"
              ></v-text-field>
            </v-col>

            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.city"
                variant="solo-filled"
                label="Ville"
              ></v-text-field>
                
            </v-col>

            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.hours"
                variant="solo-filled"
                label="Horaire"
              ></v-text-field>
            </v-col>

            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.description"
                variant="solo-filled"
                label="Description"
              ></v-text-field>
                
            </v-col>
            <v-col 
              cols="12"
              sm="7"
            >
              <v-text-field
                v-model="form.language"
                variant="solo-filled"
                label="Langues parlées"
              ></v-text-field>
                
            </v-col>
          </v-row>
        </v-container>
        <!-- <RouterLink to="/protected-page/carers"> -->
          <v-btn
            :loading="isUpdating"
            :variant="isUpdating ? 'tonal' : undefined"
            color="blue-grey-lighten-3"
            :prepend-icon="mdiUpdate"
            @click="createHospital"
          >
            Créer
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