import axiosClient from "./axiosClient";

const studentApi = {
    getAll: (params) => {
        const url = '/v1/students';
        return axiosClient.get(url, { params });
    },
    
}
export default studentApi;