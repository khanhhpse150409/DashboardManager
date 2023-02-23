import { get } from "../../Service/Service";
import { API_STUDENTS } from "../../Service/endpoind";

export const listStudent = () => {
  return get({})(`${API_STUDENTS.LIST_STUDENTS}`);
};
