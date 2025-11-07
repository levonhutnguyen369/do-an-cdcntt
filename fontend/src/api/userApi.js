import axiosClient from "./axiosClient";

const userApi = {
  getCurrentUser: () => axiosClient.get("/user/current"),

  updateProfile: (data) => axiosClient.put("/user/update", data),
};

export default userApi;
