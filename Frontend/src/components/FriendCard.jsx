import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={friend.profilePic}
                alt={friend.fullName}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <h3 className="font-semibold text-sm sm:text-base md:text-lg truncate max-w-[200px]">
            {friend.fullName}
          </h3>
        </div>

        {/* LANGUAGE TAGS */}
        <div className="flex flex-wrap gap-2 mb-3 text-xs sm:text-sm">
          <span className="badge badge-secondary flex items-center">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline flex items-center">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* MESSAGE BUTTON */}
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline btn-sm sm:btn-md w-full"
        >
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

// Flag utility
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 w-auto mr-1 inline-block"
      />
    );
  }
  return null;
}
