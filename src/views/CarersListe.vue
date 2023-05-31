<script setup>
import NavigationDrawersHospital from '../components/NavigationDrawersHospital.vue'
import LogOut from '../components/LogOut.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import { 
  mdiChevronLeft, 
} from '@mdi/js'

  let drawer= ref(true)
  let rail=ref(true)
  let infoUser =ref({})

  const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};

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