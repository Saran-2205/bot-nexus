import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <div className="bg-[#1a1a2e]/50 border border-[#E53935]/50 hover:border-[#2196F3]/50 p-5 rounded-xl shadow-md hover:shadow-[0_0_20px_rgba(33,150,243,0.3)] transition">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/project-icon.jpg"}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] to-transparent opacity-80"></div>
        {badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-[#E53935] text-black text-xs font-semibold px-3 py-1 rounded-full">
              {badge}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-300 line-clamp-3">{subtitle}</p>
      <div className="flex justify-end mt-4 gap-3">
        <Link to={editLink} className="text-[#2196F3]">
          <FaEdit />
        </Link>
        <button
          onClick={onDelete}
          className="text-[#E53935] cursor-pointer"
          disabled={isDeleting}
        >
          {isDeleting ? "..." : <FaTrashAlt />}
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
