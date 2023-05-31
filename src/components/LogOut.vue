<script setup>

import { 
  mdiCog,
  mdiLogoutVariant
} from '@mdi/js'
import { ref } from 'vue';


function logout(){
  let logout = ref(false)
  const config = {
    headers:{
      Authorization: 'Bearer' + localStorage.removeItem('token')
    }
  }
  
  if(logout.value === true){
    return config,
    router.push({path:'/'})
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
      @click="logout"
    ></v-list-item>
  </v-list>

  <slot></slot>

</template>

<style scoped>
  .route{
    text-decoration: none;
  }
</style>

