const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-[#121212] p-6 rounded-lg text-white border w-120 border-gray-700">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 cursor-pointer">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-[#E53935] rounded hover:bg-red-600 cursor-pointer">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
