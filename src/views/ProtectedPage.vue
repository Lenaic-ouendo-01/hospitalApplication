<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import NavigationDrawersHospital from '../components/NavigationDrawersHospital.vue'
import LogOut from '../components/LogOut.vue'

import { 
  mdiChevronLeft, 
  mdiAccount, 
  mdiHome, 
  mdiAccountMultiplePlus, 
  mdiCharity,
  mdiHospital,
  mdiRotateLeftVariant,
  mdiDoctor,
  mdiStethoscope,
  mdiGridLarge,
  mdiAlienOutline,
  mdiVirusOffOutline
} from '@mdi/js'

import { Home, } from 'lucide-vue-next';
import { aliases, mdi } from 'vuetify/iconsets/mdi'

  let drawer= ref(true)

  let rail=ref(true)
  let router=useRouter()
  let infoUser =ref({})
  let isLoading = ref(true)

const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};
const url = "http://127.0.0.1:8000/api/me";
onMounted(() => {
  axios.get(url, config)
  .then(res=> {
    console.log(res)
    if(res.status === 200){
      isLoading.value = false;
      infoUser.value = res.data;
    }
})
  .catch(err=> {
    console.log(err)
    router.push({path: '/'});
  })
})

</script>

<template>
  
  <v-container>
    <center class="ma-16" v-if="isLoading">
      <v-progress-circular 
        indeterminate 
        :size="67" 
        :width="6" 
      >
      </v-progress-circular>
    </center>
    <v-layout v-else>
      <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      >
        <v-list-item 
          prepend-avatar="https://randomuser.me/api/portraits/women/94.jpg"
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
        <v-divider></v-divider> 
        <v-divider></v-divider>
        
        <NavigationDrawersHospital></NavigationDrawersHospital>
        
        <template v-slot:append>
          <LogOut></LogOut>
        </template>
      </v-navigation-drawer>
      <v-main>
        <div> 
          <!-- <div class="pa-4 text-end">
            <RouterLink to="/protected-page/service">
              <v-btn
                class="text-none"
                color="medium-emphasis"
                min-width="92"
                rounded
                variant="outlined"
                @click="dialog = false"
              >
                Create Service
              </v-btn>
            </RouterLink>
              <RouterView/>
          </div>  -->

          <v-card
            class="mx-auto my-10"
            width="400"
            :prepend-icon="mdiAlienOutline"
                  
          >
            <template v-slot:title>
              Welcom {{infoUser.name}}
            </template>
  
            <v-card-text class="text-center text-h6">
              Today is a new day 😎. So enjoy ❤️.  
            </v-card-text>
          </v-card>
                    
          <v-timeline>
            <v-timeline-item
              dot-color="blue-lighten-2"
              :icon="mdiAccount"
              fill-dot
            >
              <v-card class="bg-white text--primary" max-width="500">
                <v-card-title class="bg-blue-lighten-2 text--primary text-h4">
                  Account
                </v-card-title>
                <v-card-text class="ma-4 text-h5">
                  Check your account now. You can update it 
                  The information of your porfil in a simple and fast way.
                </v-card-text>
                <div class="pa-4 text-center">
                  <RouterLink to="">
                    <v-btn
                      color="warning"
                      variant="outlined"                    
                    >
                      Go
                    </v-btn>
                  </RouterLink>
                </div>
              </v-card>
            </v-timeline-item>
          </v-timeline>
          <v-timeline>
            <v-timeline-item
              dot-color="blue-lighten-3"
              :icon="mdiStethoscope"
              fill-dot
            >
              <v-card class="bg-white text--primary" max-width="500">
                <v-card-title class="bg-blue-lighten-3 text--primary text-h4">
                  Carers
                </v-card-title>
                <v-card-text class="ma-4 text-h5">
                  Consult the list of caregivers now. You can put it on 
                  up to date in a simple and fast way.
                </v-card-text>
                <div class="pa-4 text-center">
                  <RouterLink to="/protected-page/carers">
                    <v-btn
                      color="warning"
                      variant="outlined"
                    >
                      Go
                    </v-btn>
                  </RouterLink>
                </div>
              </v-card>
            </v-timeline-item>
          </v-timeline>
          <v-timeline>
            <v-timeline-item
              dot-color="blue-lighten-4"
              :icon="mdiCharity"
              fill-dot
            >
              <v-card class="bg-white text--primary" max-width="500">
                <v-card-title class="bg-blue-lighten-4 text--primary text-h4">
                  Services
                </v-card-title>
                <v-card-text class="ma-4 text-h5">
                  Consult now the list of services available in your
                  center. You can update it quickly and easily.
                </v-card-text>
                <div class="pa-4 text-center">
                  <RouterLink to="/protected-page/service">
                    <v-btn
                      color="warning"
                      variant="outlined"                      
                    >
                      Go
                    </v-btn>
                  </RouterLink>
                </div>
              </v-card>
            </v-timeline-item>
          </v-timeline>
          <v-timeline>
            <v-timeline-item
              dot-color="blue-lighten-5"
              :icon="mdiVirusOffOutline"
              fill-dot
            >
              <v-card class="bg-white text--primary" max-width="500">
                <v-card-title class="bg-blue-lighten-5 text--primary text-h4">
                  Patients
                </v-card-title>
                <v-card-text class="ma-4 text-h5">
                  Access your centre's patient list.
                  You can update it quickly and easily.
                </v-card-text>
                <div class="pa-4 text-center">
                  <RouterLink to="/protected-page/">
                    <v-btn
                      color="warning"
                      variant="outlined"                      
                    >
                      Go
                    </v-btn>
                  </RouterLink>
                </div>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-main>
    </v-layout>
  </v-container>
</template>

<style scoped>

</style>
