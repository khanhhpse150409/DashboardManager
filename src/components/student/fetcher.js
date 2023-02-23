import { get, GATEWAY } from "../../Service/Service";
import { API_STUDENTS } from "../../Service/endpoint";

export const listStudent = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STUDENTS.LIST_STUDENTS}`
  );
};
