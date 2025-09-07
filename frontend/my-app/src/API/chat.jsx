import { axios_api } from "../lib/axios";

export const getStreamToken = async () => {
  try {
    const res = await axios_api.get("/chat/token", {
      withCredentials: true, // إذا كنت تستخدم HttpOnly cookie
    });
    return res.data.token;
  } catch (err) {
    console.error("Error fetching chat token:", err.response || err);
    return null;
  }
};
