<script setup>
import NavigationDrawersHospital from '../components/NavigationDrawersHospital.vue'
import LogOut from '../components/LogOut.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import { 
  mdiChevronLeft, 
  mdiDoctor, 
} from '@mdi/js'
import axios from 'axios';
  let name = ref("")
  let drawer= ref(true)
  let rail=ref(true)
  let infoUser =ref({})

const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};

let items = ref(["Masculin", "Feminin", "Transgenre", "Autre"])
let nation= ref(['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 
    'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 
    'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 
    'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 
    'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 
    'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'
])
let rules = ref ({
    required: value => !!value || 'Required.',
    counter: value => value.length <= 20 || 'Max 20 characters',
    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
    },
});
let phoneNumber = ref("+229 ")
let birth = ref("")
let sex = ref("Masculin")
let nationality = ref("")
let language  = ref("")
let email = ref("")
let password = ref("Anvb@DEflqg2vh3M")

function createDoctor(){
  console.log(email.value, password.value)
  axios
  .post("http://127.0.0.1:8000/api/users/doctors",{
    "email": email.value,
    "name": name.value,
    "phoneNumber": phoneNumber.value,
    "nationality": nationality.value,
    "sex": sex.value,
    "birth": birth.value,
    // "language": language.value,
    "password": password.value
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
          prepend-avatar="https://th.bing.com/th/id/R.6035ac84041991e738c514bbf7301c4f?rik=tIIlwfNMtPyhbw&riu=http%3a%2f%2fval-revermont.fr%2fwordpress%2fwp-content%2fuploads%2f2018%2f07%2fMedecin.jpg&ehk=uYtLlYVRCDqJvPOLoa8L27yj6tUSOIu3wd0ZgfaMYAU%3d&risl=&pid=ImgRaw&r=0"
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
          <v-row>
            <v-col>
              <v-card
                class="mx-auto my-10"
                width="400"
                :prepend-icon="mdiDoctor"
              >    
                <v-card-text 
                  class="text-center text-h5"
                >
                  Ajouter un nouveau membre du personnel soignant.  
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              sm="10"
            >
              <v-text-field
                v-model="name"
                label="Nom et Prénom"
                variant="outlined"
              ></v-text-field>
            </v-col>
            
            <v-col
              cols="12"
              sm="10"
            >
              <v-text-field
                v-model="email"
                variant="outlined"
                :rules="[rules.required, rules.email]"
                label="E-mail"
              ></v-text-field>
            </v-col>
        
            <v-col 
              cols="12"
              sm="5"
            >
              <v-text-field
                v-model="phoneNumber"
                label="Numéro de téléphone"
                variant="outlined"
              ></v-text-field>
            </v-col>
        
            <v-col
              cols="12"
              sm="5"
            >
              <v-combobox
                v-model="sex"
                :items="items"
                label="Sex"
                variant="outlined"
              >
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :model-value="data.selected"
                    :disabled="data.disabled"
                    size="small"
                    @click:close="data.parent.selectItem(data.item)"
                  >
                    <template v-slot:prepend>
                      <v-avatar
                        class="bg-black text-warning text-uppercase"
                        start
                      >
                        {{ data.item.title.slice(0, 1) }}
                      </v-avatar>
                    </template>
                    {{ data.item.title }}
                  </v-chip>
                </template> 
              </v-combobox>
            </v-col>

            <v-col 
              cols="12"
              sm="10"
            >
              <v-autocomplete
                v-model="nationality"
                :rules="[() => !!nationality || 'This field is required']"
                :items="nation"
                label="Pays d'origine"
                placeholder="Select..."
                required
              ></v-autocomplete>
            
            </v-col>
            
            <v-col
              cols="12"
              sm="10"
            >
                <v-text-field
                v-model="language"
                label="Langue parlée"
                variant="outlined"
                ></v-text-field>
            </v-col>
            
            <v-col 
              cols="10"
            >
              <v-text-field
                v-model="birth"
                label="Date de naisance"
                placeholder="dd/mm/yyyy"
                variant="outlined"
              ></v-text-field>
            </v-col>
        
            <!-- <v-col 
            cols="8"
            >
                <v-text-field
                    v-model="address"
                    label="Address"
                    variant="outlined"
                ></v-text-field>
            </v-col> -->
          </v-row>
        </v-container>
        <RouterLink to="/protected-page">
          <v-btn
            :loading="isUpdating"
            :variant="isUpdating ? 'tonal' : undefined"
            color="blue-grey-lighten-3"
            :prepend-icon="mdiUpdate"
            @click="createDoctor"
          >
            Ajouter
          </v-btn>
        </RouterLink>
      </v-main>

    </v-layout>
  </v-card>

</template>

<style scoped>
  .route{
    text-decoration: none;
  }
</style>