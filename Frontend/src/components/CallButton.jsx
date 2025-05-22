import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3 sm:p-4 z-10 border-b flex items-center justify-end w-full max-w-7xl mx-auto absolute top-0">
      <button
        onClick={handleVideoCall}
        className="btn btn-sm sm:btn-md btn-circle bg-base text-base-content hover:bg-base/20 transition-all"
        aria-label="Start Video Call"
      >
        <VideoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}

export default CallButton;
