<!-- <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  mdiChevronLeft, 
  mdiAccount, 
  mdiHome, 
  mdiAccountGroupOutline, 
  mdiCharity,
} from '@mdi/js'


  // let items= ref([
  //   { title: 'Home', icon: 'mdi-home-city' },
  //   { title: 'My Account', icon: 'mdi-account' },
  //   { title: 'Users', icon: 'mdi-account-group-outline' },
  // ])
  let rail=ref(true)
  let router=useRouter()
  let infoUser =ref({})
  let isLoading = ref(true)

  const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};
import NavigationDrawersHospital from '../components/NavigationDrawersHospital.vue'


let service = ref([{sName: "", sResponsable: ""}]);

  let name = ref("");
  let Sername = ref("Add New Service")
  
  let isUpdating = ref(false);
  
  let responsable = ref("");

  //importation of Icon
//   import { Closable } from 'lucide-vue-next';

</script>

<template>

  
  
  <v-card>
    <v-layout>
      <v-navigation-drawer
      v-model="drawer"
      image=""
      :rail="rail"
      permanent
      @click="rail = false"
      >
      <v-list-item 
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
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
    
      <NavigationDrawersHospital> 
      </NavigationDrawersHospital>
      
      
      </v-navigation-drawer>
      <v-main>
        <v-container fluid class="d-flex justify-center">
          <v-card
            :loading="isUpdating"
            color="blue-grey-lighten-4"
            class="mx-auto"
            max-width="480"
          >
            <v-img
              cover
              height="200"
              src=""
            >
              <v-row class="pa-3">
      
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
        
                <v-row>
                  <v-col class="text-center">
                    <h2 class="text-h4">{{ Sername }}</h2>
                  </v-col>
                </v-row>
              </v-row>
            </v-img>
          
            <v-form>
              <v-container>
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                    v-model="name"
                    :disabled="isUpdating"
                    color="blue-grey-lighten-2"
                    label="Service Name"
                    ></v-text-field>
                  </v-col>
            
                  <v-col cols="12">
                    <v-text-field
                    v-model="responsable"
                    :disabled="isUpdating"
                    color="blue-grey-lighten-2"
                    label="Responsable "
                    ></v-text-field>
                  </v-col>
                  
                  
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="friends"
                      :disabled="isUpdating"
                      :items="people"
                      chips
                      closable-chips
                      color="blue-grey-lighten-2"
                      item-title="name"
                      item-value="name"
                      label="Service Selection"
                      multiple
                    >
                      <template v-slot:chip="{ props, item }">
                        <v-chip
                          v-bind="props"    
                        ></v-chip>
                      </template>
                      
                      <template v-slot:item="{ props, item }">
                        <v-list-item
                          v-bind="props"
                          :prepend-avatar="item?.raw?.avatar"
                          :title="item?.raw?.name"
                          :subtitle="item?.raw?.group"
                        ></v-list-item>
                      </template>
                    </v-autocomplete>
                    
                  </v-col>
      
                </v-row>
              </v-container>
            </v-form>
      
            <v-divider></v-divider>
          
            <v-card-actions>
            
              <v-btn
                :loading="isUpdating"
                :variant="isUpdating ? 'tonal' : undefined"
                color="blue-grey-lighten-3"
                prepend-icon="mdi-update"
                @click="isUpdating = true"
                >
                <RouterLink to="/protected-page">
                  Create Now
                </RouterLink>
                <RouterView/>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
        
      </v-main>
    </v-layout>
  </v-card>

</template> -->

<script setup>
import axios from 'axios';
import NavigationDrawersHospital from '../components/NavigationDrawersHospital.vue'
import LogOut from '../components/LogOut.vue'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import { 
  mdiChevronLeft, 
  mdiAccount, 
  mdiHome, 
  mdiAccountMultiplePlus, 
  mdiRoomServiceOutline,
  mdiCharity,
  mdiHospital,
  mdiRotateLeftVariant,
  mdiDoctor,
  mdiStethoscope
} from '@mdi/js'

import { Home, } from 'lucide-vue-next';
import { aliases, mdi } from 'vuetify/iconsets/mdi'

  let drawer= ref(true)
  // let items= ref([
  //   { title: 'Home', icon: 'mdi-home-city' },
  //   { title: 'My Account', icon: 'mdi-account' },
  //   { title: 'Users', icon: 'mdi-account-group-outline' },
  // ])
  let rail=ref(true)
  let router=useRouter()
  let infoUser =ref({})
  let isLoading = ref(true)

  const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};

let nom=ref("")
let description=ref("")
let opening_hours=ref("")
let status=ref("")

function createService(){
  axios
  .post("http://127.0.0.1:8000/api/service/create",{
      "nom": nom.value,
      "description": description.value,
      "opening_hours": opening_hours.value,
      "status": status.value,
      // "marital_status": marital_status.value
  },config)
  .then(
      (response) =>{
      console.log(response)
      // router.push({path: '/protected-page'});
      
      }
  )
  .catch(error => console.log(error));
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
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
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
        <v-container fluid class="d-flex justify-center">
          <v-container
            :loading="isUpdating"
            
            class="mx-auto"
            max-width="480"
            center
          >
            <!-- <v-img
              cover
              height="200"
              src=""
            >
              <v-row class="pa-3">
      
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
        
                <v-row>
                  <v-col class="text-center">
                    <h2 class="text-h4">{{ Sername }}</h2>
                  </v-col>
                </v-row>
              </v-row>
            </v-img> -->
          
            <v-form>
              <v-container max-width="300px">
                <v-row dense>
                  <v-col cols="8">
                    <v-text-field
                    v-model="nom"
                    :disabled="isUpdating"
                    label="Nom du service"
                    ></v-text-field>
                  </v-col>
            
                  <v-col cols="8">
                    <v-text-field
                    v-model="description"
                    :disabled="isUpdating"
                    label="Description "
                    ></v-text-field>
                  </v-col>

                  <v-col cols="8">
                    <v-text-field
                      v-model="opening_hours"
                      :disabled="isUpdating"
                      label="Heure d'ouverture "
                      placeholder="xx:xx:xx"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="8">
                    <v-text-field
                      v-model="status"
                      :disabled="isUpdating"
                      label="Statu"
                    ></v-text-field>
                  </v-col>
      
                </v-row>
              </v-container>
            </v-form>
      
            <v-divider></v-divider>
          
            <v-card-actions>
            
              <v-btn
                :loading="isUpdating"
                :variant="isUpdating ? 'tonal' : undefined"
                prepend-icon="mdi-update"
                @click="createService"
                >
                <RouterLink to="/protected-page" class="route">
                  Create Now
                </RouterLink>
                <RouterView/>
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-container>
        
      </v-main>

    </v-layout>
  </v-card>

</template>

<style scoped>
  .route{
    text-decoration: none;
  }
</style>

