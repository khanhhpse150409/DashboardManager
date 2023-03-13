import { get, GATEWAY, put } from "../../Service/Service";
import { API_STUDENTS } from "../../Service/endpoint";

export const listStudent = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STUDENTS.LIST_STUDENTS}`
  );
};

export const getStudent = (id) => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STUDENTS.GET_STUDENTS}/${id}`
  );
};

export const editStudent = (data) => {
  return put({ data: data, gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STUDENTS.EDIT_STUDENTS}`
  );
};

export const deleteStudent = (id) => {
  return put({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STUDENTS.DELETE_STUDENTS}/delete?student_ids%5B0%5D=${id}`
  );
};