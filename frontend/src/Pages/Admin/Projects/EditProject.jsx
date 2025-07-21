import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectForm from "../../../Components/Admin/ProjectForm.jsx";
import { useQuery } from "@tanstack/react-query";

const EditProject = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: projectData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["project", slug],
    queryFn: () =>
      axios.get(`/api/admin/projects/${slug}`).then((res) => res.data.project),
    enabled: !!slug,
  });

  const handleSubmit = async (formData) => {
    const updatePromise = axios.patch(`/api/admin/projects/${slug}`, formData);
    toast.promise(updatePromise, {
      loading: "Updating project...",
      success: "Project updated successfully!",
      error: "Failed to update project",
    });

    try {
      await updatePromise;
      navigate("/nexus-hq/projects");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="p-5">Loading project data...</div>;
  if (isError)
    return <div className="p-5 text-red-500">Error: {error.message}</div>;
  if (!projectData) return <div className="p-5">Project not found</div>;

  return (
    <div className="p-5 text-[#E93535]">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <ProjectForm
        initialData={projectData}
        onSubmit={handleSubmit}
        isEditMode={true}
      />
    </div>
  );
};

export default EditProject;
