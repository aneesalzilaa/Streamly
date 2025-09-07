import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendedUsers, getMyFriends, sendFriendRequest } from "../API/frinds";
import PageLoader from "../components/PageLoader";

const HomePage = () => {
  const navigate = useNavigate();

  const [friends, setFriends] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [sendingRequestId, setSendingRequestId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [friendsData, recommendedData] = await Promise.all([
          getMyFriends(),
          getRecommendedUsers(),
        ]);
        setFriends(friendsData);
        setRecommendedUsers(recommendedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSendRequest = async (userId) => {
    setSendingRequestId(userId);
    try {
      await sendFriendRequest(userId);
      setRecommendedUsers((prev) => prev.filter((user) => user._id !== userId));
      alert("Friend request sent!");
    } catch (error) {
      console.error("Failed to send friend request:", error);
      alert("Failed to send friend request");
    } finally {
      setSendingRequestId(null);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <button
            onClick={() => navigate("/notifications")}
            className="btn btn-outline btn-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4"></svg>
            Friend Requests
          </button>
        </div>

        {/* Friends Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No friends found.</p>
          ) : (
            friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 p-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar size-16 rounded-full">
                    <img src={friend.profilePic} alt={friend.fullName} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{friend.fullName}</h3>
                    <p className="text-xs opacity-70 mt-1">
                      {friend.location || "Unknown"}
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Native Language:</strong> {friend.nativeLanguage || "N/A"}
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Learning:</strong> {friend.learningLanguage || "N/A"}
                    </p>
                    {friend.email && <p className="text-sm mt-1"><strong>Email:</strong> {friend.email}</p>}
                    {friend.bio && <p className="text-sm mt-1 opacity-70">{friend.bio}</p>}
                  </div>
                </div>

                <button
                  className="btn btn-outline btn-sm mt-3 w-full"
                  onClick={() => navigate(`/chat/${friend._id}`)}
                >
                  Message
                </button>
              </div>
            ))
          )}
        </div>

        {/* Recommended Users Section */}
        <section>
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
              <p className="opacity-70">Discover perfect language exchange partners based on your profile</p>
            </div>
          </div>

          {/* Recommended Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedUsers.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No recommended users found.</p>
            ) : (
              recommendedUsers.map((user) => (
                <div key={user._id} className="card bg-base-200 hover:shadow-lg transition-all duration-300">
                  <div className="card-body p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar size-16 rounded-full">
                        <img src={user.profilePic} alt={user.fullName} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.fullName}</h3>
                        <div className="flex items-center text-xs opacity-70 mt-1">
                          {user.location || "Unknown"}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="badge badge-secondary">
                        {user.nativeLanguageFlag || "🏳️"} Native: {user.nativeLanguage}
                      </span>
                      <span className="badge badge-outline">
                        {user.learningLanguageFlag || "🏳️"} Learning: {user.learningLanguage}
                      </span>
                    </div>

                    {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

                    <button
                      className="btn btn-primary w-full mt-2 flex items-center justify-center gap-2"
                      onClick={() => handleSendRequest(user._id)}
                      disabled={sendingRequestId === user._id}
                    >
                      {sendingRequestId === user._id ? "Sending..." : "Send Friend Request"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
