import { get, GATEWAY, put, post } from "../../Service/Service";
import { API_MAJOR } from "../../Service/endpoint";

export const listCategory = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_MAJOR.LIST_MAJOR}`
  );
};

export const getStudent = (id) => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_MAJOR.GET_MAJOR}/${id}`
  );
};

export const editStudent = (data) => {
  return put({ data: data, gw: GATEWAY.REACT_APP_API_URL })(
    `${API_MAJOR.EDIT_MAJOR}`
  );
};

export const deleteStudent = (id) => {
  return put({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_MAJOR.DELETE_MAJOR}/delete?major_ids%5B0%5D=${id}`
  );
};

export const createCategory = (data) => {
  return post({ data: data, gw: GATEWAY.REACT_APP_API_URL })(
    `${API_MAJOR.CREATE_MAJOR}`
  );
};