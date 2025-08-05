import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CompetitionForm from "../../../Components/Admin/CompetitionForm.jsx";
import { useQuery } from "@tanstack/react-query";

const EditCompetition = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: competitionData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["competition", slug],
    queryFn: () =>
      axios
        .get(`/api/admin/competitions/${slug}`)
        .then((res) => res.data.competition),
    enabled: !!slug,
  });

  const handleSubmit = async (formData) => {
    const updatePromise = axios.patch(
      `/api/admin/competitions/${slug}`,
      formData
    );
    toast.promise(updatePromise, {
      loading: "Updating competition...",
      success: "competition updated successfully!",
      error: "Failed to update competition",
    });

    try {
      await updatePromise;
      navigate("/nexus-hq/competitions");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="p-5">Loading competiton data...</div>;
  if (isError)
    return <div className="p-5 text-red-500">Error: {error.message}</div>;
  if (!competitionData) return <div className="p-5">Competition not found</div>;

  return (
    <div className="p-5 text-[#E93535]">
      <h1 className="text-2xl font-bold mb-4">Edit Competition</h1>
      <CompetitionForm
        initialData={competitionData}
        onSubmit={handleSubmit}
        isEditMode={true}
      />
    </div>
  );
};

export default EditCompetition;
