import { get, GATEWAY, put, post } from "../../Service/Service";
import { API_CATEGORY } from "../../Service/endpoint";

export const listCategory = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_CATEGORY.LIST_CATEGORY}`
  );
};

export const getStudent = (id) => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_CATEGORY.GET_CATEGORY}/${id}`
  );
};

export const editStudent = (data) => {
  return put({ data: data, gw: GATEWAY.REACT_APP_API_URL })(
    `${API_CATEGORY.EDIT_CATEGORY}`
  );
};

export const deleteStudent = (id) => {
  return put({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_CATEGORY.DELETE_CATEGORY}/delete?cate_ids%5B0%5D=${id}`
  );
};

export const createCategory = (data) => {
  return post({ data: data, gw: GATEWAY.REACT_APP_API_URL })(
    `${API_CATEGORY.CREATE_CATEGORY}`
  );
};