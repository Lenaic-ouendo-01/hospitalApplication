<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
  mdiStethoscope,
mdiVirusOffOutline
} from '@mdi/js'


  // let items= ref([
  //   { title: 'Home', icon: 'mdi-home-city' },
  //   { title: 'My Account', icon: 'mdi-account' },
  //   { title: 'Users', icon: 'mdi-account-group-outline' },
  // ])
</script>

<template>
  <v-list density="default" nav>
    <RouterLink to="/protected-page" class="route">
      <v-list-item :prepend-icon="mdiHome" title="Home" value="home"></v-list-item>
    </RouterLink>
    <RouterLink to="/protected-page/accounts" class="route">
      <v-list-item :prepend-icon="mdiAccount" title="My Account" value="account"></v-list-item>
    </RouterLink>
    <RouterLink to="/protected-page/hospital" class="route">
      <v-list-item :prepend-icon="mdiHospital" title="Hospital" value="hospital"></v-list-item>
    </RouterLink>
    <RouterLink to="/protected-page/carers" class="route">
      <v-list-item :prepend-icon="mdiStethoscope" title="Carers" value="carers"></v-list-item>
    </RouterLink>
    <RouterLink to="/protected-page/services" class="route">
      <v-list-item :prepend-icon="mdiCharity" title="Services" value="services"></v-list-item>
    </RouterLink>
  
  </v-list>
  
  
  <slot></slot>

</template>

<style scoped>
  .route{
    text-decoration: none;
  }
</style>

