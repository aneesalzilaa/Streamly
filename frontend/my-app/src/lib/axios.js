import axios from "axios";

export const axios_api = axios.create({
  baseURL: "http://localhost:5000/api", // <-- هنا قاعدة المسار للـ backend
  withCredentials: true, // إذا تستخدم الجلسات/cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
