import AdminListLayout from "../../../Components/Admin/AdminListLayout.jsx";
import AdminCard from "../../../Components/Admin/AdminCard.jsx";
import ConfirmModal from "../../../Components/ConfirmModal.jsx";
import { useAdminList } from "../../../hooks/useAdminList.js";

const fetchCompetitions = async () => {
  const res = await fetch("/api/admin/competitions/");
  if (!res.ok) throw new Error("Failed to fetch competitions");
  const data = await res.json();
  return data.competitions;
};

const deleteCompetition = async (id) => {
  const res = await fetch(`/api/admin/competitions/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete");
  }
  return await res.json();
};

const CompetitionsPage = () => {
  const {
    data: competitions,
    isLoading,
    isError,
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    resetModal,
    deletingId,
  } = useAdminList(["admin-competitions"], fetchCompetitions, deleteCompetition);

  return (
    <>
      <AdminListLayout
        title="Competitions"
        createPath="/nexus-hq/competitions/create"
        isLoading={isLoading}
        isError={isError}
      >
        {competitions?.map((competition) => (
          <AdminCard
            key={competition._id}
            title={competition.title}
            subtitle={competition.shortDesc}
            badge={competition.category}
            image={competition.img}
            editLink={`/nexus-hq/competitions/${competition.slug}/edit`}
            onDelete={() => handleDeleteClick(competition._id)}
            isDeleting={deletingId === competition._id}
          />
        ))}
      </AdminListLayout>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this competition?"
        onConfirm={handleConfirmDelete}
        onCancel={resetModal}
      />
    </>
  );
};

export default CompetitionsPage;
