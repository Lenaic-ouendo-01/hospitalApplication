<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'
import { RouterLink, routerKey } from 'vue-router';
import { mdiLockOutline, mdiEye, mdiEyeOff, mdiArrowLeft } from '@mdi/js'


  let agreement = ref(false)
  let visible = ref(false)
  let dialog = ref(false)
  let form = ref(false)
  let isLoading = ref(false)
  let phone = ref("")
  let rules = {
    email: v => !!(v || '').match(/^(?=.*[a-z])(?=.*@)(?=.*[a-z])(?=.*(\.[a-z])).+$/) || 'Please enter a valid email',
    length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
    password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 
      'Password must contain an upper case letter A-Z, a numeric character 0-9, and a special character',
    required: v => !!v || 'This field is required',
    names:  v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z]).+$/) || 
      'Your name must begin with upper case letter A-Z',
    number: v => !!(v || '').match(/[0-9]/) ||
      'Your phone number is available'
  }
  let name=ref("")
  let email=ref("")
  let password=ref("")
  let router=useRouter()

  function onSubmit(){
    console.log(name.value, email.value, password.value)
    axios
    .post("http://127.0.0.1:8000/api/register",{
      "name":  name.value,
      "password": password.value,
      "email": email.value
    })
    .then(
      (response) =>{
        console.log(response)
        if(response.status === 200 || response.status === 201){
          router.push({path: '/'});
        }
      }
    )
    .catch(error => console.log(error));
  }

</script>

<template>
  <v-card
    class="mx-auto ma-16"
    style="max-width: 500px;"
  >
    <v-toolbar
      color="teal-lighten-3"
      cards
      dark
      flat
    >
      <RouterLink to="/">
        <v-btn>
          <v-icon :icon="mdiArrowLeft"/>
        </v-btn>
      </RouterLink>
      
      <v-card-title class="text-h6 font-weight-regular">
        Sign up
      </v-card-title>

      <!-- <v-spacer></v-spacer> -->

    </v-toolbar>
    <v-form
      ref="form"
      v-model="form"
      class="pa-4 pt-6"
    >
      <v-text-field
        v-model="name"
        color="primary"
        :rules="[rules.names]"
        label="Name"
        variant="filled"
      ></v-text-field>

      <v-text-field
      v-model="phone"
      :rules="[rules.number]"
      variant="filled"
      color="deep-purple"
      label="Phone number"
      ></v-text-field>

      <v-text-field
      v-model="email"
      :rules="[rules.email]"
      variant="filled"
      color="deep-purple"
      label="Email address"
      type="email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        :append-inner-icon="visible ? mdiEye : mdiEyeOff"
        :type="visible ? 'text' : 'password'"
        :prepend-inner-icon="mdiLockOutline"
        @click:append-inner="visible = !visible"
        variant="filled"
        color="deep-purple"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>   
      
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="deep-purple"
      >
        <template v-slot:label>
          I agree to the&nbsp;
          <a
            href="#"
            @click.stop.prevent="dialog = true"
          >Terms of Service</a>
          &nbsp;and&nbsp;
          <a
            href="#"
            @click.stop.prevent="dialog = true"
          >Privacy Policy</a> <span class="priority">*</span>
        </template>
      </v-checkbox>
    </v-form>

    <v-divider></v-divider>
    
    <v-card-actions>
      <v-btn
        variant="text"
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
    
      <v-spacer></v-spacer>
    
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        color="deep-purple-accent-4"
        @click="onSubmit"
      >
        Submit
      </v-btn>
    </v-card-actions>
    
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 bg-grey-lighten-3">
          Legal
        </v-card-title>
    
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
    
        <v-divider></v-divider>
    
        <v-card-actions>
          <v-btn
            variant="text"
            @click="agreement = false, dialog = false"
          >
            No
          </v-btn>
    
          <v-spacer></v-spacer>
    
          <v-btn
            color="deep-purple"
            variant="tonal"
            @click="agreement = true, dialog = false"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
.priority{
  color: red;
}
</style>
