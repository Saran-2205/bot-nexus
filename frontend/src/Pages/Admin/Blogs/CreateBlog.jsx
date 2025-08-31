import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import BlogForm from "../../../Components/Admin/BlogForm";
import { FiArrowLeft } from "react-icons/fi";

const CreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const API = import.meta.env.VITE_API_URL;

  const { mutate: createMutation, isLoading } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await axios.post(`${API}/api/admin/blog/add`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        return res.data;
      } catch (err) {
        const message =
          err.response?.data?.error || err.message || "Something went wrong";
        throw new Error(message);
      }
    },

    onSuccess: (data) => {
      toast.success(data.message || "Blog added successfully");
      queryClient.invalidateQueries(["blog"]);
      navigate("/nexus-hq/blog");
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleCreateBlog = (formData) => {
    createMutation(formData);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#E93535] mb-2 flex items-center">
            <button
              onClick={() => {
                navigate("/nexus-hq/blog");
              }}
              className="mr-2 text-[#E93535] cursor-pointer"
            >
              <FiArrowLeft />
            </button>
            Create New Blog Post
          </h1>
          <p className="text-gray-600">
            Share your insights and stories with the community
          </p>
        </div>
      </div>

      <div className="rounded-lg shadow-md">
        <div className="p-6">
          <BlogForm onSubmit={handleCreateBlog} isSubmitting={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
