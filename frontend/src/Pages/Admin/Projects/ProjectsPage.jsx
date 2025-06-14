import AdminListLayout from "../../../Components/Admin/AdminListLayout.jsx";
import AdminCard from "../../../Components/Admin/AdminCard.jsx";
import ConfirmModal from "../../../Components/ConfirmModal.jsx";
import { useAdminList } from "../../../hooks/useAdminList.js";

const fetchProjects = async () => {
  const res = await fetch("/api/admin/projects/");
  if (!res.ok) throw new Error("Failed to fetch projects");
  const data = await res.json();
  return data.projects;
};

const deleteProject = async (id) => {
  const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete");
  }
  return await res.json();
};

const ProjectsPage = () => {
  const {
    data: projects,
    isLoading,
    isError,
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    resetModal,
    deletingId,
  } = useAdminList(["admin-projects"], fetchProjects, deleteProject);

  return (
    <>
      <AdminListLayout
        title="Projects"
        createPath="/nexus-hq/projects/create"
        isLoading={isLoading}
        isError={isError}
      >
        {projects?.map((project) => (
          <AdminCard
            key={project._id}
            title={project.title}
            subtitle={project.shortDesc}
            badge={project.category}
            image={project.img}
            editLink={`/nexus-hq/projects/${project.slug}/edit`}
            onDelete={() => handleDeleteClick(project._id)}
            isDeleting={deletingId === project._id}
          />
        ))}
      </AdminListLayout>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this project?"
        onConfirm={handleConfirmDelete}
        onCancel={resetModal}
      />
    </>
  );
};

export default ProjectsPage;
