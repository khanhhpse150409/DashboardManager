// // export { default as localStorageServ } from './locaStorage.service';
// export { default as AxiosServ } from './axios.service';
// // export * as httpServ from './http.service/http.service';import axios from "axios";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Dashboard from "../components/dashboard";

export const ABORT_MESSAGE = "canceled";

const idToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoidU1sakRSa2hNMFhWam5WcDVRS2p1UjhEaXU0MiIsImVtYWlsIjoidmllbm5ndXllbkBjb2lubWFwLnRlY2giLCJyb2xlX25hbWUiOiJBZG1pbiIsImlhdCI6MTY3NzE1ODA0MywiZXhwIjoxNjc3MTYxNjQzfQ.O2op1Iik6qB3d6wISeQCev2YPn-87of7lAK9liH4_VI";

export const loginGoogle = (token, allowedRoles) => {
  console.log(token);

  return () => {
    const [userRole, setUserRole] = useState(null);

    axios({
      method: "POST",
      url: "https://capstone-matching.herokuapp.com/api/v1/auth/loginGoogle",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(456);
      });

    useEffect(() => {
      const idToken = localStorage.getItem("idToken");
      axios
        .post(
          "https://capstone-matching.herokuapp.com/api/v1/auth/loginGoogle",
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        )
        .then((response) => {
          const role = response.data.role;
          if (allowedRoles.includes(role)) {
            setUserRole(role);
          } else {
            setUserRole("unauthorized");
          }
        })
        .catch((error) => {
          setUserRole("unauthorized");
        });
    }, []);
    if (userRole === null) {
      return <div>Loading...</div>;
    } else if (userRole === "unauthorized") {
      return <div>Unauthorized</div>;
    } else {
      return <Dashboard />;
    }
  };
};

export const get =
  ({ options, headers, gw }) =>
  (url) => {
    return fetch(`https://capstone-matching.herokuapp.com${url}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then(async (res) => {
        return res.json();
      })
      .catch((err) => {
        if (err?.msg === "Access token invalid") {
          return { message: ABORT_MESSAGE };
        }
        return { error: JSON.parse(err.msg) };
      });
  };
