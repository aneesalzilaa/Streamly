import { axios_api } from "../lib/axios";

// جلب المستخدمين الموصى بهم
export const getRecommendedUsers = async () => {
  const response = await axios_api.get("/users/"); // هذا المسار يتطابق مع router.get('/', ...)
  return response.data;
};

// جلب أصدقاء المستخدم الحالي
export const getMyFriends = async () => {
  const response = await axios_api.get("/users/friends");
  return response.data;
};

// إرسال طلب صداقة
export const sendFriendRequest = async (userId) => {
  const response = await axios_api.post(`/users/friends/request/${userId}`);
  return response.data;
};

// قبول طلب صداقة
export const acceptFriendRequest = async (requestId) => {
  const response = await axios_api.put(`/users/friends/accept/${requestId}`);
  return response.data;
};

// جلب الطلبات الواردة
export const getFriendRequests = async () => {
  const response = await axios_api.get("/users/friend-requests");
  return response.data;
};

// جلب الطلبات الصادرة
export const getOutgoingFriendReqs = async () => {
  const response = await axios_api.get("/users/friend-requests/outgoing");
  return response.data;
};
