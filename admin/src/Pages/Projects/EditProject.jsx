import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectForm from "../../Components/ProjectForm.jsx";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner.jsx";
import { FiArrowLeft } from "react-icons/fi";

const EditProject = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const {
    data: projectData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["project", slug],
    queryFn: () =>
      axios.get(`${API}/api/admin/projects/${slug}`).then((res) => res.data.project),
    enabled: !!slug,
  });

  const handleSubmit = async (formData) => {
    const updatePromise = axios.patch(`${API}/api/admin/projects/${slug}`, formData);
    toast.promise(updatePromise, {
      loading: "Updating project...",
      success: "Project updated successfully!",
      error: "Failed to update project",
    });

    try {
      await updatePromise;
      navigate("/projects");
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
  if (!projectData) return <div className="p-5">Project not found</div>;

  return (
    <div className="p-5 text-[#E93535]">
      <h1 className="text-2xl font-bold mb-4 items-center flex ">
        <button
          onClick={() => {
            navigate("/projects");
          }}
          className="mr-2 text-[#E93535] cursor-pointer"
        >
          <FiArrowLeft />
        </button>
        Edit Project
      </h1>
      <ProjectForm
        initialData={projectData}
        onSubmit={handleSubmit}
        isEditMode={true}
      />
    </div>
  );
};

export default EditProject;
