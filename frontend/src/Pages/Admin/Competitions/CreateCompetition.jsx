import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import CompetitionForm from "../../../Components/Admin/CompetitionForm.jsx";

const CreateCompetitionPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createMutation, isLoading } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await axios.post("/api/admin/competitions/add", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        return res.data;
      } catch (err) {
        const message =
          err.response?.data?.error || err.message || "Something went wrong";
        throw new Error(message);
      }
    },

    onSuccess: (data) => {
      toast.success(data.message || "Competition added successfully");
      queryClient.invalidateQueries(["competitions"]);
      navigate("/nexus-hq/competitions");
    },

    onError: (error) => {
      console.log(error)
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleCreateCompetition = (formData) => {
    createMutation(formData);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#E93535] mb-2">Add New Competition</h1>
            <p className="text-gray-600">Set up a new competition with all the necessary details</p>
          </div>
          
        </div>
      </div>
      
      <div className="rounded-xl shadow-md overflow-hidden">
        <div>
          <CompetitionForm 
            onSubmit={handleCreateCompetition} 
            isSubmitting={isLoading}
          />
        </div>
        
        
      </div>
    </div>
  );
};

export default CreateCompetitionPage;