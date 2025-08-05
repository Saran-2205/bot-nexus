import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAdminList = (queryKey, fetchFn, deleteFn) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: fetchFn,
    onError: (error) => toast.error(`Error loading data: ${error.message}`),
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: async (id) => {
      setDeletingId(id);
      await deleteFn(id);
    },
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries(queryKey);
      resetModal();
    },
    onError: (error) => {
      toast.error(`Error deleting: ${error.message}`);
      setDeletingId(null);
    },
  });

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) deleteItem(selectedId);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setDeletingId(null);
  };

  return {
    data,
    isLoading,
    isError,
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    resetModal,
    deletingId,
  };
};
