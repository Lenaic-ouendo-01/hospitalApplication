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
  console.log(route.params);
  doctor();
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

function doctor(){
  axios
  .get("http://127.0.0.1:8000/api/users/" + route.params.doctorId, config)
  .then(
    (response) =>{
      form.value = response.data.data
    }
  )
  .catch(error => console.log(error));
}

function editDoctor(){
  axios
  .put("http://127.0.0.1:8000/api/users/" + route.params.doctorId,{
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
          prepend-avatar="https://scontent-lis1-1.xx.fbcdn.net/v/t1.6435-9/116822065_980948495679776_9093214250912544364_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=NQIzTHWQDQoAX9_kjoj&_nc_ht=scontent-lis1-1.xx&oh=00_AfA2b-cSCf9ZMsEXWYZe4a2Px2aNvOllFAnSH4wvg-3dZA&oe=64AFB9F6"
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
            @click="editDoctor"
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