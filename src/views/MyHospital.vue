<script setup>
import { onMounted, ref } from 'vue';
import { useMeStore } from '../stores/me.store';
import axios from 'axios';

onMounted(async()=>{
    await authUser.me();
    await listHospital();
    console.log(hospital)
    console.log(authUser.user.data);
})

const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};

const authUser = useMeStore();

let src = ref([
    "https://th.bing.com/th/id/R.c9d1b7962b76cd76a938e469432c2d0d?rik=o0n2hvbfRF2goQ&riu=http%3a%2f%2freliablefire.com%2fwp-content%2fuploads%2f2013%2f10%2fhospital1.jpg&ehk=2UMiroZOmRPjOyIO8glz4cI%2fo%2f4LXTW3AWpe%2bMBo8vQ%3d&risl=&pid=ImgRaw&r=0",
    "https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2020/04/24/node_764090/47356788/public/2020/04/24/B9723299169Z.1_20200424155740_000%2BG8GFU2BTF.1-0.jpg?itok=x1DwPsea1591893613",
    "https://insights.omnia-health.com/sites/omnia-health.com/files/hospital_1.jpg",
    "https://img.huffingtonpost.com/asset/5ccdbf4c2400006800402c46.jpeg?ops=1778_1000",
    "https://images.radio-canada.ca/q_auto,w_1250/v1/ici-premiere/16x9/tum-penurie-personnel-medical-infirmiere-medecin.jpg"
])
let hospital = ref({})

function listHospital() {
  if( authUser.user.isLoading==true) {
    const userId = authUser.user.data.id;

    axios
        .get('http://127.0.0.1:8000/api/hospital/'+ userId, config)
        .then(
            (reponse) => {
                hospital.value = reponse.data.data
                console.log(hospital.value.name)
                if(hospital){
                    //infohospital = hospital;
                    console.log(hospital.value);
                    console.log("Hôpital trouvé");
                } else {
                    console.log("Hôpital non trouvé");
                }
            }
        )
        .catch(erreur => console.log(erreur));
  }
}
// function hospitalInfo(){
//     if (authUser.user.data && authUser.user.data.hospital_id) {
//         const hospitalId = authUser.user.data.hospital_id;
//         const hospitalInfo = hospital.value.find((hospital) => hospital.id === hospitalId);
        
//         if (hospitalInfo) {
//             // Faire quelque chose avec les informations de l'hôpital trouvé
//             console.log(hospitalInfo);
//         } else {
//             // L'hôpital n'a pas été trouvé
//             console.log("Hôpital non trouvé");
//         }
//     }
// }
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
        <v-carousel
            cycle
            height="700"
            hide-delimiter-background
            show-arrows="hover"
        >
            <v-carousel-item
                v-for="(source, i) in src"
                :key="i"
                :src="source"
                cover
            >
            </v-carousel-item>
        </v-carousel>

        <v-alert
            v-if="!hospital"
            border="start"
            border-color="warning"
            elevation="6"
            max-width="450px"
            class="text-h5 ma-16"
        >
            <!-- <v-btn
                :prepend-icon="mdiAccountPlus"
                @click="createService"
            > -->
            Créer dès maintenant votre
            <RouterLink to="/protected-page/hospital/create" class="route">
                Hôpital 
            </RouterLink>
            <!-- </v-btn> -->
        </v-alert>
        <div v-else>
            <center class="bg-head">
                <v-card class="text-h4 text-white">
                    BIENVENUE
                </v-card>
            </center>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-card
                            elevation="5"
                        >
                            <v-card-title class="text-h5">
                                Nom:
                            </v-card-title>
                            <v-card-text class="text-h6">
                                {{ hospital.name }}
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
                                {{ hospital.email }}
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-card
                            elevation="4"
                        >
                            <v-card-title class="text-h5">
                                Numéro fix:
                            </v-card-title>
                            <v-card-text class="text-h6">
                                {{ hospital.number_fix }}
                            </v-card-text>
                        </v-card>
                    </v-col>
            
                    <v-col cols="12" sm="6">
                        <v-card
                            elevation="3"
                        >
                            <v-card-title class="text-h5">
                                Numéro mobile:
                            </v-card-title>
                            <v-card-text class="text-h6">
                                {{ hospital.number_mobile }}
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-card
                            elevation="3"
                        >
                            <v-card-title class="text-h5">
                            Numéro d'urgence:
                            </v-card-title>
                            <v-card-text class="text-h6">
                                {{ hospital.number_urgence }}
                            </v-card-text>
                        </v-card>
                    </v-col>
            
                    <v-col cols="12" sm="6">
                        <v-card 
                            elevation="2"
                        >
                            <v-card-title class="text-h5">
                                Adresse:
                            </v-card-title>
                            <v-card-text class="text-h6">
                                {{ hospital.address }}
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-card 
                            elevation="2"
                        >
                            <v-card-title class="text-h5">
                                Ville:
                            </v-card-title>
                            <v-card-text class="text-h6">
                                {{ hospital.city }}
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
    </div>
</template>

<style scoped>

</style>