import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TeamForm from "../../Components/TeamForm.jsx";
import { useQuery } from "@tanstack/react-query";
import { FiArrowLeft } from "react-icons/fi";
import LoadingSpinner from "../../Components/LoadingSpinner.jsx";

const EditTeam = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const {
    data: teamData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["team", slug],
    queryFn: () =>
      axios.get(`${API}/api/admin/team/${slug}`,{withCredentials:true}).then((res) => res.data.teamMember),
    enabled: !!slug,
  });

  const handleSubmit = async (formData) => {
    const updatePromise = axios.patch(`${API}/api/admin/team/${slug}`, formData,{withCredentials:true});
    toast.promise(updatePromise, {
      loading: "Updating team member...",
      success: "Team Member updated successfully!",
      error: "Failed to update team",
    });

    try {
      await updatePromise;
      navigate("/nexus-hq/team");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return <div className="p-5 text-red-500">Error: {error.message}</div>;
  if (!teamData) return <div className="p-5">Team Member not found</div>;

  return (
    <div className="p-5 text-[#E93535]">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <button
          onClick={() => {
            navigate("/nexus-hq/team");
          }}
          className="mr-2 text-[#E93535] cursor-pointer"
        >
          <FiArrowLeft />
        </button>
        Edit Team Member
      </h1>
      <TeamForm
        initialData={teamData}
        onSubmit={handleSubmit}
        isEditMode={true}
      />
    </div>
  );
};

export default EditTeam;
