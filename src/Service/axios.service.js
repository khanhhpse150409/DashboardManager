// import Axios from "axios";
// // // import { store } from "../index";
// // import { DOMAIN, tokenByClass } from "./configURL/constant";
// // // import {
// // //   set_spinner_end,
// // //   set_spinner_start,
// // // } from "../redux/action/spinnerAction";
// import localStorageServ from "./locaStorage.service";
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../components/dashboard';

firebase.auth().signInWithEmailAndPassword()
  .then(userCredential => {
    return userCredential.user.getIdToken();
  })
  .then(idToken => {
    localStorage.setItem('idToken', idToken);
    // redirect to home page or do something else
  })
  .catch(error => {
    // handle error
  });

  const withAuthorization = (Component, allowedRoles) => {
    return () => {
      const [userRole, setUserRole] = useState(null);
      
      useEffect(() => {
        const idToken = localStorage.getItem('idToken');
        axios.get('/api/check-role', { headers: { 
            Authorization: `Bearer ${idToken}` } })
          
            .then(response => {
            const role = response.data.role;
            
            if (allowedRoles.includes(role)) {
              setUserRole(role);
            } else {
              setUserRole('unauthorized');
            }
          })
          .catch(error => {
            setUserRole('unauthorized');
          });
      }, []);
      if (userRole === null) {
        return <div>Loading...</div>;
      } else if (userRole === 'unauthorized') {
        return <div>Unauthorized</div>;
      } else {
        return <Dashboard />;
      }
    };
  };
  export default withAuthorization;

// class AxiosService {
//   axios;
//   axiosConfig;
//   authService;
//   constructor(params) {
//     this.axios = Axios.create({
//       baseURL: this.getBaseUrl(),
//     });
//     this.getAxiosConfig();
//   }

// //   getBaseUrl() {
// //     return DOMAIN;
// //   }

//   // domain production  => user
//   // domain test => tester
//   //  domain dev
//   getAxiosConfig = (_token) => {
//     const token = _token ? _token : localStorageServ.accessToken.get();
//     this.axiosConfig = {
//       headers: {
//         // tokenByClass: tokenByClass,
//         Authorization:
//           "bearer" + localStorageServ.userInfor.get()?.accessToken,
//         token,   
//       },
//     };
//   };

//   removeAxiosConfig = () => {
//     this.axiosConfig = {
//       headers: {
//         iKeapy: ``,
//         "Content-Type": "application/json",
//       },
//     };
//   };

//   getMethod(uri, loading = true) {
//     return this.handleFlow(this.axios.get(uri, this.axiosConfig), loading);
//   }

//   postMethod(uri, data, loading = true) {
//     return this.handleFlow(
//       this.axios.post(uri, data, this.axiosConfig),
//       loading
//     );
//   }

//   putMethod(uri, data, loading = true) {
//     return this.handleFlow(
//       this.axios.put(uri, data, this.axiosConfig),
//       loading
//     );
//   }

//   patchMethod(uri, data, loading = true) {
//     return this.handleFlow(
//       this.axios.patch(uri, data, this.axiosConfig),
//       loading
//     );
//   }

//   deleteMethod(uri, loading = true) {
//     return this.handleFlow(this.axios.delete(uri, this.axiosConfig), loading);
//   }

//   handleFlow(method, loading = true) {
//     // store.dispatch(set_spinner_start());
//     return new Promise((resolve, reject) => {
//       method
//         .then((res) => {
//           // store.dispatch(set_spinner_end());
//           resolve({
//             data: res.data,
//             status: res.status,
//             isSuccess: true,
//           });
//         })
//         .catch((err) => {
//           // store.dispatch(set_spinner_end());

//           this.handleError(err);
//           reject({
//             err: err,
//           });
//         });
//     });
//   }

//   handleError = (err) => {
//     const status = err.response?.status;
//     switch (status) {
//       // case 400:
//       // case 401: "a"
//       // case 403: 'B'
//       // window.location.assign("/login");
//       //   break;
//       // default:
//       //   break;
//     }
//   };
//   //
//   axiosInstance = (req) => {
//     this.axios(req, this.axiosConfig);
//   };
// }

// const AxiosServ = new AxiosService();
// export default AxiosServ;
