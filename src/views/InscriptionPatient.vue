<script setup>
import { 
  mdiAccountMultiplePlusOutline, 
  mdiApplicationParenthesesOutline, 
  mdiEye, 
  mdiEyeOff, 
  mdiRecord,
  mdiUpdate
} from '@mdi/js';
import axios from 'axios';
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};
let visible = ref(false)
let email= ref('');
let rules = ref ({
    required: value => !!value || 'Required.',
    counter: value => value.length <= 100 || 'Max 100 characters',
    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
    },
});
let rule = {
  password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 
      'Password must contain an upper case letter A-Z, a numeric character 0-9, and a special character',
    required: v => !!v || 'This field is required'
}
let length= ref(4);
let onboarding= ref(0);
let router=useRouter();

function next () {
  this.onboarding = this.onboarding + 1 > this.length
  ? 1
  : this.onboarding + 1
};
function prev () {
  this.onboarding = this.onboarding - 1 <= 0
  ? this.length
  : this.onboarding - 1
};

let name = ref("");
let number = ref("+229 ");
let birth = ref("");
let address = ref("");
let sex = ref("Masculin")
let items = ref(["Masculin", "Feminin", "Transgenre", "Autre"])
let password = ref("");
let profession = ref("");
let allergies = ref("");
let history_diseases = ref("");
let ex_surgery = ref("");
let vaccine = ref("");
let hereditary = ref("");
let insurance = ref("");
let emergency_contact = ref("+229 ");
let blood_type = ref("");
let language = ref("");
let marital_status = ref("");

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
let country = ref("")

function createPatient(){
    console.log(email.value, password.value)
    axios
    .post("http://127.0.0.1:8000/api/users/patients",{
      "password": password.value,
      "email": email.value,
      "name": name.value,
      "phoneNumber": number.value,
      "nationality": country.value,
      "sex": sex.value,
      "birth": birth.value,
      "address": address.value,
      "profession": profession.value,
      "allergies": allergies.value,
      "history_diseases": history_diseases.value,
      "ex_surgery": ex_surgery.value,
      "vaccine": vaccine.value,
      "hereditary": hereditary.value,
      "insurance": insurance.value,
      "emergency_contact": emergency_contact.value,
      "blood_type": blood_type.value,
      "language": language.value,
      "marital_status": marital_status.value
    },config)
    .then(
      (response) =>{
        console.log(response)
        router.push({path: '/protected-page/patients'});
        
      }
    )
    .catch(error => console.log(error));
  }

</script>

<template>
  <v-form>
    <v-container>
      <v-card
        class="mx-auto my-10 bg-grey-darken-2"
        max-width="300"
        :prepend-icon="mdiAccountMultiplePlusOutline"                
      >
        <template v-slot:title :prepend-icon="mdiApplicationParenthesesOutline">
          Add new patient ❤️.
        </template>
      </v-card>

        <!-- <v-row>
            <v-col
              cols="12"
              sm="8"
            >
              <v-text-field
                v-model="firstname"
                color="blue-grey-lighten-2"
                label="First name"
                variant="outlined"
              ></v-text-field>
            </v-col>
            
            <v-col 
              cols="12"
              sm="8"
            >
              <v-text-field
                v-model="lastname"
                color="blue-grey-lighten-2"
                label="Last name"
                variant="outlined"
              ></v-text-field>
            </v-col>
        
            <v-col
              cols="8"
              sm="6"
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
              cols="8"
              sm="6"
            >
                <v-autocomplete
                    ref="country"
                    v-model="country"
                    :rules="[() => !!country || 'This field is required']"
                    :items="nation"
                    label="Country"
                    placeholder="Select..."
                    required
                ></v-autocomplete>
                
            </v-col>
            
            <v-col
              cols="12"
              sm="8"
            >
                <v-text-field
                v-model="num"
                color="blue-grey-lighten-2"
                label="Cell Phone"
                variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="8"
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
            sm="8"
            >
                <v-text-field
                    v-model="title"
                    :rules="[rules.required, rules.counter]"
                    label="Profession"
                    counter
                    variant="outlined"
                    maxlength="20"
                ></v-text-field>
            </v-col>
            
            <v-col 
                cols="8"
                >
                <v-text-field
                v-model="birth"
                color="blue-grey-lighten-2"
                label="Day of birth"
                placeholder="dd/mm/yyyy"
                variant="outlined"
                ></v-text-field>
            </v-col>
        
            <v-col 
              cols="8"
            >
              <v-text-field
                v-model="address"
                color="blue-grey-lighten-2"
                label="Address"
                variant="outlined"
              ></v-text-field>
            </v-col>
            
        </v-row> -->

      <v-card flat rounded="0">
        <v-window v-model="onboarding">
          <v-window-item
            :key="`card-${1}`"
            :value="1"
          >
            <span class="text-center"> Informations personnelles </span>
            <v-text-field
              v-model="name"
              color="blue-grey-lighten-2"
              label="Nom et Prénoms"
              variant="outlined"
            ></v-text-field>
            <v-combobox
              v-model="sex"
              :items="items"
              label="Sexe"
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
            <v-autocomplete
              v-model="country"
              :rules="[() => !!country || 'This field is required']"
              :items="nation"
              label="Pays d'origine"
              placeholder="Select..."
              required
            ></v-autocomplete>
            <v-text-field
              v-model="number"
              color="blue-grey-lighten-2"
              label="Cell Phone"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="profession"
              :rules="[rules.required, rules.counter]"
              label="Profession"
              counter
              variant="outlined"
              maxlength="100"
            ></v-text-field>
            <v-text-field
              v-model="birth"
              color="blue-grey-lighten-2"
              label="Day of birth"
              format="yy-mm-dd"
              placeholder="dd/mm/yyyy"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="address"
              color="blue-grey-lighten-2"
              label="Address"
              variant="outlined"
            ></v-text-field>
          </v-window-item>

          <v-window-item
            :key="`card-${2}`"
            :value="2"
          >

            <span>Antécédents médicaux </span>
            
            <v-text-field
              v-model="allergies"
              color="blue-grey-lighten-2"
              label="Allergies"
              placeholder="Ex: Poils de chat, Plume..."
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="history_diseases"
              color="blue-grey-lighten-2"
              label="Conditions préexistantes"
              placeholder="Ex: Asthme, Diabète..."
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="hereditary"
              color="blue-grey-lighten-2"
              label="Maladies héréditaires"
              placeholder="Ex: VIH-Sida..."
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="ex_surgery"
              color="blue-grey-lighten-2"
              label="Ex chirugie"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="vaccine"
              color="blue-grey-lighten-2"
              label="Vaccins"
              placeholder="Ex: Polio, COVID-19..."
              variant="outlined"
            ></v-text-field>
          </v-window-item>

          <v-window-item
            :key="`card-${3}`"
            :value="3"
          >

            <div>Autres Information </div>
            <v-text-field
              v-model="blood_type"
              color="blue-grey-lighten-2"
              label="Groupe Sanguin"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="insurance"
              color="blue-grey-lighten-2"
              label="Assurance"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="emergency_contact"
              color="blue-grey-lighten-2"
              label="Contact d'urgence"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="language"
              color="blue-grey-lighten-2"
              label="Langue"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="marital_status"
              color="blue-grey-lighten-2"
              label="Situation Matrimoniale"
              variant="outlined"
            ></v-text-field>
          </v-window-item>

          <v-window-item
            :key="`card-${4}`"
            :value="4"
          >
            <span>Information de connexion</span>
            <v-text-field
              v-model="email"
              variant="outlined"
              :rules="[rules.required, rules.email]"
              label="E-mail"
            ></v-text-field>
            <v-text-field
              v-model="password"
              color="blue-grey-lighten-2"
              label="Mot de passe"
              variant="filled"
            ></v-text-field>

            <!-- <v-text-field
              v-model="password"
              :rules="[rule.password, rule.length(6)]"
              :append-inner-icon="visible ? mdiEye : mdiEyeOff"
              :type="visible ? 'text' : 'password'"
              :prepend-inner-icon="mdiLockOutline"
              @click:append-inner="visible = !visible"
              variant="outlined"
              color="blue-grey-lighten-2"
              counter="6"
              label="Mots de passe"
              style="min-height: 96px"
              type="password"
            ></v-text-field> -->

            <RouterLink to="/protected-page">
              <v-btn
                :loading="isUpdating"
                :variant="isUpdating ? 'tonal' : undefined"
                color="blue-grey-lighten-3"
                :prepend-icon="mdiUpdate"
                @click="createPatient"
              >
                Créer maintenant
              </v-btn>
            </RouterLink>
          </v-window-item>
        </v-window>

        <v-card-actions class="justify-space-between">
          <v-item-group
            v-model="onboarding"
            class="text-center"
            mandatory
          >
            <v-item
              v-for="n in length"
              :key="`btn-${n}`"
              v-slot="{ isSelected, toggle }"
              :value="n"
            >
              <v-btn
                :variant="isSelected ? 'outlined' : 'text'"
                :prepend-icon="mdiRecord"
                rounded
                class="text-center"
                @click="toggle"
              ></v-btn>
            </v-item>
          </v-item-group>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>

<style scoped>
  .route{
    text-decoration: none;
  }
  
</style>

