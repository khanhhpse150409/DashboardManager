import { get, GATEWAY } from "../../Service/Service";
import { API_STATISTIC } from "../../Service/endpoint";

export const getDataProjects = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STATISTIC.STATISTIC_PROJECTS}`
  );
};

export const getDataFinishProjects = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STATISTIC.STATISTIC_FINISH_PROJECT}`
  );
};

export const getDataAccounts = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STATISTIC.STATISTIC_ACCOUNTS}`
  );
};

export const getDataTransaction = () => {
  return get({ gw: GATEWAY.REACT_APP_API_URL })(
    `${API_STATISTIC.STATISTIC_TRANSACTION}`
  );
};