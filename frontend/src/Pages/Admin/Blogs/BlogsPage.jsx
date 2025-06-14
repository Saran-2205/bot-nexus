import AdminListLayout from "../../../Components/Admin/AdminListLayout.jsx";
import AdminCard from "../../../Components/Admin/AdminCard.jsx";
import ConfirmModal from "../../../Components/ConfirmModal.jsx";
import { useAdminList } from "../../../hooks/useAdminList.js";

const fetchBlogs = async () => {
  const res = await fetch("/api/admin/blog/");
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  return data.blogs;
};

const deleteBlog = async (id) => {
  const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete");
  }
  return await res.json();
};

const BlogsPage = () => {
  const {
    data: blogs,
    isLoading,
    isError,
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    resetModal,
    deletingId,
  } = useAdminList(["admin-blogs"], fetchBlogs, deleteBlog);

  return (
    <>
      <AdminListLayout
        title="Blogs"
        createPath="/nexus-hq/blog/create"
        isLoading={isLoading}
        isError={isError}
      >
        {blogs?.map((blog) => (
          <AdminCard
            key={blog._id}
            title={blog.title}
            subtitle={blog.shortDesc}
            badge={blog.category}
            image={blog.image}
            editLink={`/nexus-hq/blog/${blog.slug}/edit`}
            onDelete={() => handleDeleteClick(blog._id)}
            isDeleting={deletingId === blog._id}
          />
        ))}
      </AdminListLayout>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={resetModal}
      />
    </>
  );
};
export default BlogsPage;
