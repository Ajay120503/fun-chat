import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const FloatingBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-primary fixed top-4 left-4 z-50 shadow-lg rounded-full"
    >
      <ArrowLeftIcon className="w-5 h-5 mr-2" />
    </button>
  );
};

export default FloatingBackButton;
