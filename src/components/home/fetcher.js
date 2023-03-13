import { get, GATEWAY } from "../../Service/Service";
import { API_PROJECT, API_STUDENTS } from "../../Service/endpoint";

export const listProject = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_PROJECT.LIST_PROJECTS}`
  );
};
export const listStudent = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STUDENTS.LIST_STUDENTS}`
  );
};