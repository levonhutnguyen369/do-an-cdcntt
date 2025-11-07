import axiosClient from "./axiosClient";

const tripApi = {
  create: (data) => axiosClient.post("/trip/create", data),

  getList: (data) => axiosClient.get("/trip/list", data),

  getById: (id) => axiosClient.get(`/trip/${id}`),

  update: (id, data) => axiosClient.put(`/trip/update/${id}`, data),

  createWithAI: (data) => axiosClient.post("/trip/generate-trip", data),

  delete: (id) => axiosClient.delete(`/trip/${id}`),
};

export default tripApi;
