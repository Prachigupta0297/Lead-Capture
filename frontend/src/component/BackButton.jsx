import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <div className="mb-6">
      <Link
        to="/"
        className="inline-flex items-center text-black-600 hover:text-black-800 font-medium"
      >
        ← back
      </Link>
    </div>
  );
};

export default BackButton;
