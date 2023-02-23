// // export { default as localStorageServ } from './locaStorage.service';
// export { default as AxiosServ } from './axios.service';
// // export * as httpServ from './http.service/http.service';import axios from "axios";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Dashboard from "../components/dashboard";

export const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const ABORT_MESSAGE = "canceled";

export const GATEWAY = {
  REACT_APP_API_URL: 'REACT_APP_API_URL',
};

const idToken = localStorage.getItem('access_token').substring(7);

const getGateway = (gw) => {
  switch (gw) {
    case GATEWAY.REACT_APP_API_URL: {
      return REACT_APP_API_URL;
    }
    default: {
      return REACT_APP_API_URL;
    }
  }
};
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
    return fetch(`${getGateway(gw)}${url}`, {
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
