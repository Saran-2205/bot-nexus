import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogForm from "../../Components/BlogForm.jsx";
import { useQuery } from "@tanstack/react-query";
import { FiArrowLeft } from "react-icons/fi";
import LoadingSpinner from "../../Components/LoadingSpinner.jsx";

const EditBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const {
    data: blogData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () =>
      axios.get(`${API}/api/admin/blog/${slug}`,{withCredentials:true}).then((res) => res.data.blog),
    enabled: !!slug,
  });

  const handleSubmit = async (formData) => {
    const updatePromise = axios.patch(`${API}/api/admin/blog/${slug}`, formData,{withCredentials:true});
    toast.promise(updatePromise, {
      loading: "Updating blog...",
      success: "Blog updated successfully!",
      error: "Failed to update blog",
    });

    try {
      await updatePromise;
      navigate("/nexus-hq/blog");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return;

  <div className="flex justify-center items-center min-h-screen ">
    <LoadingSpinner />
  </div>;
  if (isError)
    return <div className="p-5 text-red-500">Error: {error.message}</div>;
  if (!blogData) return <div className="p-5">Blog not found</div>;

  return (
    <div className="p-5 text-[#E93535]">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <button
          onClick={() => {
            navigate("/nexus-hq/blog");
          }}
          className="mr-2 text-[#E93535] cursor-pointer"
        >
          <FiArrowLeft />
        </button>
        Edit Blog
      </h1>
      <BlogForm
        initialData={blogData}
        onSubmit={handleSubmit}
        isEditMode={true}
      />
    </div>
  );
};

export default EditBlog;
