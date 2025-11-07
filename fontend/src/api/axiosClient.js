import axios from "axios";

// Tạo instance axios
const axiosClient = axios.create({
  baseURL: "http://localhost:8082/api", // URL backend
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Thêm interceptor để tự động gắn token vào mỗi request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Xử lý lỗi response (ví dụ: token hết hạn)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ. Đăng xuất...");
      localStorage.removeItem("token");
      window.location.href = "/"; // chuyển hướng về trang login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
