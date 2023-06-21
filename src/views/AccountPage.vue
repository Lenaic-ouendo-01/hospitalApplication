<script setup>
import { useMeStore } from '../stores/me.store';
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
 

onMounted(()=>{
  authUser.me()
  console.log(authUser.user.data)
})

const authUser = useMeStore();

</script>

<template>
  <center class="ma-16" v-if="authUser.user.isLoading == true">
    <v-progress-circular 
      indeterminate 
      :size="67" 
      :width="6" 
    >
    </v-progress-circular>
  </center>
  <div v-else>
    <center class="bg-head">
      <div>
        <v-avatar size="200px" class="bg-grey ma-15">
          <v-img
            src="https://th.bing.com/th/id/R.6035ac84041991e738c514bbf7301c4f?rik=tIIlwfNMtPyhbw&riu=http%3a%2f%2fval-revermont.fr%2fwordpress%2fwp-content%2fuploads%2f2018%2f07%2fMedecin.jpg&ehk=uYtLlYVRCDqJvPOLoa8L27yj6tUSOIu3wd0ZgfaMYAU%3d&risl=&pid=ImgRaw&r=0"
            ></v-img>
          </v-avatar>
          <v-chip
            size="small"
            class="bg-success text-success"
            rounded=""
          >a</v-chip>
      </div>
      <div class="text-h4 text-white">
        Welcom {{ authUser.user.data.name }}
      </div>
    </center>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card
            elevation="4"
          >
            <v-card-title class="text-h5">
              Nom:
            </v-card-title>
            <v-card-text class="text-h6">
              {{ authUser.user.data.name }}
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6">
          <v-card
            elevation="4"
          >
            <v-card-title class="text-h5">
              Email:
            </v-card-title>
            <v-card-text class="text-h6">
              {{ authUser.user.data.email }}
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6">
          <v-card
            elevation="4"
          >
            <v-card-title class="text-h5">
              Numéro de téléphone:
            </v-card-title>
            <v-card-text class="text-h6">
              {{ authUser.user.data.phoneNumber }}
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6">
          <v-card
            elevation="4"
          >
            <v-card-title class="text-h5">
              Sexe:
            </v-card-title>
            <v-card-text class="text-h6">
              {{ authUser.user.data.sex }}
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="12">
          <v-card 
            elevation="4"
          >
            <v-card-title class="text-h5">
              Nationalité:
            </v-card-title>
            <v-card-text class="text-h6">
              {{ authUser.user.data.nationality }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <RouterLink to="/protected-page">
      <v-btn class="">
        Retour
      </v-btn>
    </RouterLink>
    <RouterView/>
  </div>
</template>

<style scoped>
  .bg-head{
    background-color:rgba(42, 8, 110, 0.878);
  }
</style>