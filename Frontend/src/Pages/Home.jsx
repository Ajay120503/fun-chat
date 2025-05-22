import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api';
import { Link } from 'react-router';
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, Users2Icon } from 'lucide-react';
import FriendCard, { getLanguageFlag } from '../components/FriendCard';
import NoFriendsFound from '../components/NoFriendsFound';
import toast from 'react-hot-toast';

function Home() {
  const queryClient = useQueryClient();
  const [outgoingRequestIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      toast.success("Request Sended Successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failt to send request!');
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        console.log(req)
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);


  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-8xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
        <Link
          to="/notifications"
          className="btn btn-outline btn-sm rounded-md flex items-center gap-2"
          aria-label="View friend requests"
        >
          <Users2Icon size={18} /> Friends Requests
        </Link>
      </div>

      {/* Friends List */}
      {loadingFriends ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg" aria-label="Loading friends" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}

      {/* Recommended Users */}
      <section className="mt-14">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet new Friends</h2>
              <p className="opacity-70 max-w-xl">
                Discover perfect language exchange partners based on your profile
              </p>
            </div>
          </div>
        </div>

        {loadingUsers ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg" aria-label="Loading recommended users"></span>
          </div>
        ) : recommendedUsers.length === 0 ? (
          <div className="card bg-base-200 p-8 text-center max-w-xl mx-auto">
            <h3 className="font-semibold text-lg mb-2">No recommendation available</h3>
            <p className="text-base-content opacity-70">
              Check back later for new language partners!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedUsers.map((user) => {
              const hasRequestBeenSent = outgoingRequestIds.has(user._id);
              return (
                <div
                  key={user._id}
                  className="card bg-base-200 hover:shadow-lg transition-shadow duration-300"
                  role="group"
                  aria-label={`Recommended user ${user.fullName}`}
                >
                  <div className="card-body p-6 space-y-4">
                    <div className="avatar mx-auto">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.profilePic} alt={user.fullName} loading="lazy" />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{user.fullName}</h3>
                      {user.location && (
                        <div className="flex items-center justify-center text-xs opacity-70 mt-1">
                          <MapPinIcon size={14} className="mr-1" />
                          {user.location}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="badge badge-secondary flex items-center gap-1">
                        {getLanguageFlag(user.nativeLanguage)}
                        Native - {capitalize(user.nativeLanguage)}
                      </span>
                      <span className="badge badge-outline flex items-center gap-1">
                        {getLanguageFlag(user.learningLanguage)}
                        Learning - {capitalize(user.learningLanguage)}
                      </span>
                    </div>

                    {user.bio && <p className="text-sm opacity-70 text-center">{user.bio}</p>}

                    {/* Action button */}
                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        } `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;

const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);
