import axios from "axios";

// 1. Instance Banao
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // Cookies ke liye zaroori
});

// --- INTERCEPTOR 1: REQUEST (Token Chipkane Wala) ---
// Har request jaane se pehle ye function chalega
api.interceptors.request.use(
  (config) => {
    // LocalStorage se token nikalo (Real app me hum Context/Memory se lete hain)
    // Abhi ke liye hum maan lete hain ki token hum header me manually nahi bhejenge
    // Balki hum 'Access Token' ko ek global variable ya localStorage me save kar lenge
    
    const token = localStorage.getItem("accessToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- INTERCEPTOR 2: RESPONSE (Error Sambhalne Wala) ---
// Har response aane par ye function chalega
api.interceptors.response.use(
  (response) => response, // Agar success hai, to kuch mat karo
  async (error) => {
    const originalRequest = error.config;

    // Check: Agar error 403 hai AUR humne abhi tak retry nahi kiya
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark kar do ki humne try kar liya (Infinite loop se bachne ke liye)

      try {
        console.log("Token Expired! Refreshing silently... 🕵️‍♂️");

        // 1. Refresh Endpoint call karo
        const res = await api.get("/refresh");
        const newAccessToken = res.data.accessToken;

        console.log("New Token Generated: ", newAccessToken);

        // 2. Token ko LocalStorage me save karo (taaki Request Interceptor use kar sake)
        localStorage.setItem("accessToken", newAccessToken);

        // 3. Naya token original request ke header me set karo
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 4. Original Request ko dobara bhejo (Retry)
        return api(originalRequest);

      } catch (refreshError) {
        console.log("Refresh Failed! User needs to login.");
        // Yahan tum user ko logout karwa sakte ho
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;