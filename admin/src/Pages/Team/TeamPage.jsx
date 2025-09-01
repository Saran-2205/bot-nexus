import AdminListLayout from "../../Components/AdminListLayout.jsx";
import AdminCard from "../../Components/AdminCard.jsx";
import ConfirmModal from "../../Components/ConfirmModal.jsx";
import { useAdminList } from "../../hooks/useAdminList.js";

const API = import.meta.env.VITE_API_URL;

const fetchTeamMembers = async () => {
  const res = await fetch(`${API}/api/admin/team/`,{
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch team members");
  const data = await res.json();
  return data.teamMembers;
};

const deleteTeamMember = async (id) => {
  const res = await fetch(`${API}/api/admin/team/${id}`,  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
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
        createPath="/nexus-hq/team/add"
        isLoading={isLoading}
        isError={isError}
        emptyState={!isLoading && !teamMembers?.length}
        emptyStateMessage="No Team Members found. Add your first Team Member!"
      >
        {isLoading ? (
          // Enhanced loading skeleton
          Array.from({ length: 6 }).map((_, i) => (
            <AdminCard 
              key={`skeleton-${i}`}
              isLoading 
              skeletonLines={2}
            />
          ))
        ) : isError ? (
          // Improved error state
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
            <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load Team Members</h3>
            <p className="text-gray-600">Please try again later or contact support if the problem persists.</p>
          </div>
        ) : teamMembers?.length === 0 ? (
          // More inviting empty state
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Team Members yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first Team Member</p>
            <a
              href="/nexus-hq/team/add"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#E93535] hover:bg-[#2196f3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196f3]"
            >
              Add Team Member
            </a>
          </div>
        ) : (
          teamMembers?.map((teamMember) => (
          <AdminCard
            key={teamMember._id}
            title={teamMember.name}
            subtitle={teamMember.designation}
            badge={teamMember.specialization}
            image={teamMember.image}
            editLink={`/nexus-hq/team/edit/${teamMember.slug}`}
            onDelete={() => handleDeleteClick(teamMember._id)}
            isDeleting={deletingId === teamMember._id}
            className="transition-transform duration-150 hover:scale-[1.02]"
          />
        ))
      )}
      </AdminListLayout>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this team member?This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={resetModal}
        confirmText="Delete Team Member"
        cancelText="Cancel"
        confirmColor="red"
      />
    </>
  );
};

export default TeamPage;
