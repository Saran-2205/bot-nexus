import { FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdminCard = ({
  title,
  subtitle,
  badge,
  image,
  editLink,
  onDelete,
  isDeleting,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[#1a1a2e]/80 border border-[#E53935]/20 hover:border-[#2196F3]/50 p-5 rounded-xl shadow-lg hover:shadow-[#2196F3]/20 transition-all duration-300 ease-in-out overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden rounded-lg mb-4">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a]/90 via-[#0d0d1a]/30 to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge with shine effect */}
        {badge && (
          <div className="absolute top-3 left-3 z-20">
            <span className="relative bg-[#E53935] text-black text-xs font-bold px-3 py-1 rounded-full shadow-md overflow-hidden">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-1 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-300/90 line-clamp-3 mt-2">
            {subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={editLink}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2196F3]/10 hover:bg-[#2196F3] text-[#2196F3] hover:text-white transition-colors duration-200"
              aria-label={`Edit ${title}`}
            >
              <FaEdit className="text-lg" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={onDelete}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E53935]/10 hover:bg-[#E53935] text-[#E53935] hover:text-white transition-colors duration-200"
              disabled={isDeleting}
              aria-label={`Delete ${title}`}
            >
              {isDeleting ? (
                <FaSpinner className="animate-spin text-lg" />
              ) : (
                <FaTrashAlt className="text-lg cursor-pointer" />
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminCard;
