import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { FaPlus } from "react-icons/fa";

const AdminListLayout = ({ 
  title, 
  createPath, 
  createText = "Create New", 
  isLoading, 
  isError, 
  errorMessage = "Error loading data", 
  children 
}) => {
  if (isError) {
    return (
      <div className="p-6 text-white">
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#E93535]">Manage {title}</h2>
        <Link
          to={createPath}
          className="bg-[#E93535] hover:bg-[#2196f3] text-black hover:text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus />{createText}{title ? ` ${title}` : ""}
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default AdminListLayout;
