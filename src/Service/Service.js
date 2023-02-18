import axios from "axios";

export const loginGoogle = (token) => {
    console.log(token);
  
    return axios
      .post(
        "https://capstone-matching.herokuapp.com/api/v1/auth/loginGoogle",
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("ok", res);
        return res;
      })
      .catch((err) => {
        console.log("loi", err);
        throw err;
      });
  };
  