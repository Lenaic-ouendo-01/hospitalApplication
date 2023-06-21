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
    
    <RouterLink to="/protected-page/patients/add-patient" class="route">
      <v-list-item :prepend-icon="mdiCharity" title="Patients" value="patients"></v-list-item>
    </RouterLink>
    
  </v-list>
  
  
  <slot></slot>

</template>

<style scoped>
  .route{
    text-decoration: none;
  }
</style>

