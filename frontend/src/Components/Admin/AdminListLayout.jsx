import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { FaPlus } from "react-icons/fa";

const AdminListLayout = ({ 
  title, 
  createPath, 
  createText = "Add New", 
  isLoading, 
  isError, 
  errorMessage = "Failed to load data. Please try again.", 
  children,
  isEmpty,
  emptyMessage = `No ${title?.toLowerCase()} found. Add one to get started!`
}) => {
  return (
    <div className="p-6 text-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-[#E93535]">
          Manage {title}
        </h2>
        
        {createPath && (
          <Link
            to={createPath}
            className="bg-[#E93535] hover:bg-[#2196f3] text-black hover:text-white px-4 py-2 rounded flex items-center gap-2 transition-colors duration-200"
          >
            <FaPlus className="flex-shrink-0" />
            <span>{createText}{title ? ` ${title}` : ""}</span>
          </Link>
        )}
      </div>

      {/* Content Section */}
      {isError ? (
        <div className="bg-[#1e1e1e] p-4 rounded-lg border border-red-500/50">
          <p className="text-red-400">{errorMessage}</p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner size="lg" />
        </div>
      ) : isEmpty ? (
        <div className="bg-[#1e1e1e] p-8 rounded-lg border border-gray-700 text-center">
          <p className="text-gray-400 mb-4">{emptyMessage}</p>
          {createPath && (
            <Link
              to={createPath}
              className="inline-flex items-center gap-2 bg-[#E93535] hover:bg-[#2196f3] text-black hover:text-white px-4 py-2 rounded transition-colors duration-200"
            >
              <FaPlus />
              <span>Add {title}</span>
            </Link>
          )}
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