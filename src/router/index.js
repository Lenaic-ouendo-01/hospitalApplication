import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LogIn
    },
    {
      path: '/protected-page',
      name: 'protectedpage',
      component: () => import("../views/ProtectedPage.vue")
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import("../views/SignUp.vue")
    },

    //Routes concernants les actions sur les médecins
    {
      path: '/protected-page/carers',
      name: 'carers',
      component: () => import("../views/CarersListe.vue")
    },
    {
      path: '/protected-page/carers/add-carer',
      name: 'addCarer',
      component: () => import("../views/AddCarers.vue")
    },
    {
      path: '/protected-page/carers/edit/:doctorId',
      name: 'editCarer',
      component: () => import("../views/EditCarer.vue")
    },

    //Routes concernants les actions sur les services
    {
      path: '/protected-page/services',
      name: 'services',
      component: () => import("../views/ServiceListe.vue")
    },
    {
      path: '/protected-page/services/add-service',
      name: 'addService',
      component: () => import("../views/AddService.vue")
    },
    {
      path: '/protected-page/service/edit/:serviceId',
      name: 'editService',
      component: () => import("../views/EditService.vue")
    },
   
    //Routes concernants les actions sur les patients
    {
      path: '/protected-page/patients',
      name: 'patients',
      component: () => import("../views/PatientList.vue")
    },
    {
      path: '/protected-page/patient/edit/:patientId',
      name: 'editPatient',
      component: () => import("../views/EditPatient.vue")
    },
    {
      path: '/protected-page/patients/add-patient',
      name: 'addPatient',
      component: () => import("../views/InscriptionPatient.vue")
    },

    //Routes concernants les actions sur les hôpitaux
    {
      path: '/protected-page/hospital',
      name: 'hospital',
      component: () => import("../views/MyHospital.vue")
    },
    {
      path: '/protected-page/hospital/create',
      name: 'createhospital',
      component: () => import("../views/CreateHospital.vue")
    },

    //Routes concernats les actions sur le User connecté
    {
      path: '/protected-page/accounts',
      name: 'accounts',
      component: () => import("../views/AccountPage.vue")
    }
  ]
})

router.beforeEach(async (to) => {
  let isAuthenticated = false
  const config = {
    headers:{
      Authorization: 'Bearer ' + localStorage.getItem('token'),    
    }
  };
  const url = "http://127.0.0.1:8000/api/me";
  axios
  .get(url, config)
  .then(res=> {
    console.log(res)
    if(res.status === 200){
      isAuthenticated = true;
      if ( !isAuthenticated && to.name !== 'signup' && to.name !== 'login') {
        // redirect the user to the login page
        return ({ name: 'login' })
      }
    }
  })
  .catch(err=> {
    console.log(err)
  }) 
})


export default router
