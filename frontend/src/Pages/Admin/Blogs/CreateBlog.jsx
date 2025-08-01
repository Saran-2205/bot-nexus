import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import BlogForm from "../../../Components/Admin/BlogForm"

const CreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createMutation } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await axios.post("/api/admin/blog/create", formData, {
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
      toast.success(data.message || "Blog created successfully");
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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#E93535]">Create New Blog</h1>
      <BlogForm onSubmit={handleCreateBlog} />
    </div>
  );
};

export default CreateBlog;
