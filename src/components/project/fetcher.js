import { get, GATEWAY, put } from "../../Service/Service";
import { API_PROJECT } from "../../Service/endpoint";

export const listProject = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_PROJECT.LIST_PROJECTS}`
  );
};

export const deleteProject = (id) => {
  return put({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_PROJECT.DELETE_PROJECTS}/delete?project_ids%5B0%5D=${id}`
  );
};