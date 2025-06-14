import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import ProjectForm from "../../../Components/Admin/ProjectForm.jsx";

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createMutation } = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await axios.post("/api/admin/projects/create", formData, {
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
      toast.success(data.message || "Project created successfully");
      queryClient.invalidateQueries(["projects"]);
      navigate("/nexus-hq/projects");
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleCreateProject = (formData) => {
    createMutation(formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#E93535]">Create New Project</h1>
      <ProjectForm onSubmit={handleCreateProject} />
    </div>
  );
};

export default CreateProjectPage;
