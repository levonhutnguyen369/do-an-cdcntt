// src/api/scheduleApi.js
import axiosClient from "./axiosClient";

const scheduleApi = {
  addActivity: (scheduleId, data) => axiosClient.post(`/schedule/${scheduleId}/activity`, data),
  getPlaces: () => axiosClient.get(`/place`),

  updateActivity: (scheduleId, activityId, data) =>
    axiosClient.put(`/schedule/${scheduleId}/activity/${activityId}`, data),

  deleteActivity: (scheduleId, activityId) =>
    axiosClient.delete(`/schedule/${scheduleId}/activity/${activityId}`),
};

export default scheduleApi;
