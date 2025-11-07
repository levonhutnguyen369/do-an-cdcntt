import axiosClient from "./axiosClient";

const placeApi = {
  getAllPlace: () => axiosClient.get("/place"),

  getPlaceByType: (data) =>
    axiosClient.get("/place/getByType", {
      params: {
        type: data.join(","),
      },
    }),
};

export default placeApi;
