import AdminListLayout from "../../../Components/Admin/AdminListLayout.jsx";
import AdminCard from "../../../Components/Admin/AdminCard.jsx";
import ConfirmModal from "../../../Components/ConfirmModal.jsx";
import { useAdminList } from "../../../hooks/useAdminList.js";

const fetchTeamMembers = async () => {
  const res = await fetch("/api/admin/team/");
  if (!res.ok) throw new Error("Failed to fetch team members");
  const data = await res.json();
  return data.teamMembers;
};

const deleteTeamMember = async (id) => {
  const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete");
  }
  return await res.json();
};

const TeamPage = () => {
  const {
    data: teamMembers,
    isLoading,
    isError,
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    resetModal,
    deletingId,
  } = useAdminList(["admin-teamMembers"], fetchTeamMembers, deleteTeamMember);

  return (
    <>
      <AdminListLayout
        title="Team Members"
        createPath="/nexus-hq/team/create"
        isLoading={isLoading}
        isError={isError}
      >
        {teamMembers?.map((teamMember) => (
          <AdminCard
            key={teamMember._id}
            title={teamMember.name}
            subtitle={teamMember.designation}
            badge={teamMember.specialization}
            image={teamMember.image}
            editLink={`/nexus-hq/team/${teamMember.slug}/edit`}
            onDelete={() => handleDeleteClick(teamMember._id)}
            isDeleting={deletingId === teamMember._id}
          />
        ))}
      </AdminListLayout>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this team member?This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={resetModal}
      />
    </>
  );
};

export default TeamPage;
