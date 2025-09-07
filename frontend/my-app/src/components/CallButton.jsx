import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3 border-b flex items-center justify-end w-full relative">
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-sm text-white flex items-center gap-1"
      >
        <VideoIcon className="w-6 h-6" />
        Call
      </button>
    </div>
  );
}

export default CallButton;
