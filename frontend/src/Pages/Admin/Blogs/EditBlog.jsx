import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogForm from "../../../Components/Admin/BlogForm.jsx";
import { useQuery } from "@tanstack/react-query";

const EditBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: blogData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () =>
      axios
        .get(`/api/admin/blog/${slug}`)
        .then((res) => res.data.blog),
    enabled: !!slug,
  });

  const handleSubmit = async (formData) => {
    const updatePromise = axios.patch(
      `/api/admin/blog/${slug}`,
      formData
    );
    toast.promise(updatePromise, {
      loading: "Updating competition...",
      success: "competition updated successfully!",
      error: "Failed to update competition",
    });

    try {
      await updatePromise;
      navigate("/nexus-hq/blog");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="p-5">Loading blog data...</div>;
  if (isError)
    return <div className="p-5 text-red-500">Error: {error.message}</div>;
  if (!blogData) return <div className="p-5">Blog not found</div>;

  return (
    <div className="p-5 text-[#E93535]">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <BlogForm
        initialData={blogData}
        onSubmit={handleSubmit}
        isEditMode={true}
      />
    </div>
  );
};

export default EditBlog;
