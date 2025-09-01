import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import ProjectForm from "../../Components/ProjectForm.jsx";
import { FiArrowLeft } from "react-icons/fi";

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const API = import.meta.env.VITE_API_URL;

  const { mutate: createMutation, isLoading } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await axios.post(`${API}/api/admin/projects/add`, formData, {
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
      toast.success(data.message || "Project added successfully");
      queryClient.invalidateQueries(["projects"]);
      navigate("/projects");
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleCreateProject = (formData) => {
    createMutation(formData);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E93535] mb-2 flex items-center">
          <button
            onClick={() => {
              navigate("/projects");
            }}
            className="mr-2 text-[#E93535] cursor-pointer"
          >
            <FiArrowLeft />
          </button>
          Add New Project
        </h1>
        <p className="text-gray-600">
          Fill out the form below to add a new project
        </p>
      </div>

      <div className="rounded-lg shadow-md">
        <ProjectForm onSubmit={handleCreateProject} isSubmitting={isLoading} />
      </div>
    </div>
  );
};

export default CreateProjectPage;
