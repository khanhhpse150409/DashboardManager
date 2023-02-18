import axios from "axios";

export const loginGoogle = (token) => {
  console.log(token);
  return () => {
    axios( {
        method: 'POST',
        url: "https://capstone-matching.herokuapp.com/api/v1/auth/loginGoogle",
        headers: {
          "accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(123);
      })
      .catch((err) => {
        console.log(456);
      });
  };
};
