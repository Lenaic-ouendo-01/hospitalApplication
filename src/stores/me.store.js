import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMeStore = defineStore('me', () => {
  const user = reactive({
    data: null,
    isLoading: false,
    error: null
  })
  
  function me() {
    user.isLoading = true  
    const config = {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token'),    
      }
    };
    const url = "http://127.0.0.1:8000/api/me";
    
    axios
      .get(url, config)
      .then(res=> {
        user.data = res.data
        user.isLoading = false  

        // console.log(res)
      }).catch(e=>{
        user.error=e
      })
  }

  return { user, me }
})
