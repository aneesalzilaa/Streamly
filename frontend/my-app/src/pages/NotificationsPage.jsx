import React, { useState, useEffect } from "react";
import { getFriendRequests, acceptFriendRequest } from "../API/frinds";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const [friendRequests, setFriendRequests] = useState({ incomingReqs: [], acceptedReqs: [] });
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);

  // useEffect لجلب الطلبات عند تحميل الصفحة
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const data = await getFriendRequests();
        setFriendRequests(data);
      } catch (error) {
        console.error("Failed to fetch friend requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // دالة قبول الطلب
  const handleAccept = async (requestId) => {
    setAcceptingId(requestId);
    try {
      await acceptFriendRequest(requestId);
      const data = await getFriendRequests();
      setFriendRequests(data);
    } catch (error) {
      console.error("Failed to accept friend request:", error);
    } finally {
      setAcceptingId(null);
    }
  };

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-gray-800">
          Notifications
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* Incoming Friend Requests */}
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                  <UserCheckIcon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-white shadow-sm hover:shadow-md rounded-lg transition-shadow"
                    >
                      <div className="card-body p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="avatar w-14 h-14 rounded-full bg-base-200 overflow-hidden">
                            <img src={request.sender.profilePic} alt={request.sender.fullName} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{request.sender.fullName}</h3>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              <span className="badge badge-secondary badge-sm">
                                Native: {request.sender.nativeLanguage}
                              </span>
                              <span className="badge badge-outline badge-sm">
                                Learning: {request.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleAccept(request._id)}
                          disabled={acceptingId === request._id}
                        >
                          {acceptingId === request._id ? "Accepting..." : "Accept"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted Requests Notifications */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="card bg-white shadow-sm hover:shadow-md rounded-lg transition-shadow"
                    >
                      <div className="card-body p-4 flex items-start gap-3">
                        <div className="avatar mt-1 size-10 rounded-full overflow-hidden">
                          <img
                            src={notification.recipient.profilePic}
                            alt={notification.recipient.fullName}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{notification.recipient.fullName}</h3>
                          <p className="text-sm my-1 text-gray-600">
                            {notification.recipient.fullName} accepted your friend request
                          </p>
                          <p className="text-xs flex items-center opacity-70 text-gray-400">
                            <ClockIcon className="h-3 w-3 mr-1" /> Recently
                          </p>
                        </div>
                        <div className="badge badge-success flex items-center gap-1 text-white bg-green-500">
                          <MessageSquareIcon className="h-3 w-3" /> New Friend
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Notifications */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && <NoNotificationsFound />}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
