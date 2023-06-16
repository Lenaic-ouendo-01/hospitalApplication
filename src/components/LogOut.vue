<script setup>

import { 
  mdiCarBrakeAlert,
  mdiCog,
  mdiLogoutVariant
} from '@mdi/js'
import { ref } from 'vue';

let dialog=ref(false)

function logout(){
  let logout = ref(false)
  const config = {
    headers:{
      Authorization: 'Bearer' + localStorage.removeItem('token')
    }
  }
  
  if(logout.value === true){
    return config;
  }
}

</script>

<template>
  <v-list density="default" nav>
    <RouterLink to="/" class="route">
      <v-list-item 
      :prepend-icon="mdiCog" 
      title="Setting" 
      value="home"
    ></v-list-item>
    </RouterLink>
    
    <v-list-item 
      :prepend-icon="mdiLogoutVariant" 
      title="LogOut" 
      value="home"
      @click="dialog = true"
    ></v-list-item>
    <v-snackbar
      v-model="dialog"
      >
      <div class="text-h4 pb-2" :prepend-icon="mdiCarBrakeAlert">Attention</div>
      <p>Souhaitez-vous vraiment vous déconnecter ?</p>
      
      <template v-slot:actions>
        <RouterLink to="/">
          <v-btn
            class="text-danger"
            color="black.0"
            variant="text"
            @click="logout, dialog = false"
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
  </v-list>

  <slot></slot>

</template>

<style scoped>
  .route{
    text-decoration: none;
  }
</style>

