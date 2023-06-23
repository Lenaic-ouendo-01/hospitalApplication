<script setup>
import LogOut from '../components/LogOut.vue'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import { 
  mdiChevronLeft, 
  mdiDoctor, 
} from '@mdi/js'
import axios from 'axios';
import NavigationDoctor from '../components/NavigationDoctor.vue';

onMounted(()=>{
  console.log(route.params);
  patient();
})

const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};
const route = useRoute()
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
  phoneNumber: '',
  birth: '',
  sex: '',
  nationality: '',
  email: '',
  name: '',
  language: ''
})
let drawer= ref(true)
let rail=ref(true)

function patient(){
  axios
  .get("http://127.0.0.1:8000/api/users/" + route.params.patientId, config)
  .then(
    (response) =>{
      form.value = response.data.data
      
    }
    )
    .catch(error => console.log(error));
    console.log(form.value);
    console.log(form.name);
}

function editPatient(){
  axios
  .put("http://127.0.0.1:8000/api/users/" + route.params.patientId,{
    "email": form.value.email,
    "name": form.value.name,
    "phoneNumber": form.value.phoneNumber,
    "nationality": form.value.nationality,
    "sex": form.value.sex,
    "birth": form.value.birth,
    // "language": language.value.language
    // "marital_status": marital_status.value
  }, config)
  .then(response =>{
    //Lors que la modification fonctionne
    console.log(response.data);
    console.log('Mise à jour des données du docteur');
    router.push({path: '/protected-page/carers'});
  })
  .catch(error =>{
    console.error('Erreur lors de la mise à jour du docteur');
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

        <NavigationDoctor></NavigationDoctor>
        
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
                label="Nom & Prénom"
              ></v-text-field>
            </v-col>
            
            <v-col
              cols="12"
              sm="10"
            >
              <v-text-field
                v-model="form.email"
                variant="outlined"
                :rules="[rules.required, rules.email]"
                label="Email"
                readonly
              ></v-text-field>
            </v-col>
        
            <v-col 
              cols="12"
              sm="5"
            >
              <v-text-field
                v-model="form.phoneNumber"
                variant="outlined"
                label="Numéro de téléphone"
              ></v-text-field>
            </v-col>
        
            <v-col
              cols="12"
              sm="5"
            >
              <v-text-field
                v-model="form.sex"
                variant="outlined"
                label="Sexe"
                readonly
              ></v-text-field>
            </v-col>

            <v-col 
              cols="12"
              sm="10"
            >
              <v-text-field
                v-model="form.nationality"
                variant="outlined"
                label="Nationalité"
              ></v-text-field>
                
            </v-col>
            <v-col 
              cols="12"
              sm="10"
            >
              <v-text-field
                v-model="form.birth"
                variant="outlined"
                label="Date Naissance"
              ></v-text-field>
                
            </v-col>
            <v-col 
              cols="12"
              sm="10"
            >
              <v-text-field
                v-model="form.language"
                variant="outlined"
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
            @click="editPatient"
          >
            Appliquer
          </v-btn>
        <!-- </RouterLink> -->
      </v-main>

    </v-layout>
  </v-card>
</template>

<style scoped>

</style>