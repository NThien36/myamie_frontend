import Button from "@/components/Buttons/Button";
import UpdatePlace from "@/components/Forms/UpdatePlace";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import CustomModal from "@/components/Modals/CustomModal";
import { useDeletePlace } from "@/services/place.service";
import { PLACE_QUERY_KEY, PLACES_ADMIN_QUERY_KEY } from "@/utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface StatusChangeProps {
  id: number;
}

function StatusChange({ id }: StatusChangeProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const updatePlaceRef = useRef<{ submit: () => void } | null>(null);
  const queryClient = useQueryClient(); // Query client for invalidating queries

  const { isPending: isDeleting, mutateAsync } = useDeletePlace();

  console.log("id", id);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);
  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  // Manage body overflow for modals
  useEffect(() => {
    document.body.style.overflow =
      isEditOpen || isDeleteOpen ? "hidden" : "auto";

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditOpen, isDeleteOpen]);

  const handleDelete = async () => {
    await mutateAsync(id, {
      onSuccess: () => {
        // Invalidate query to refetch data
        queryClient.invalidateQueries({
          queryKey: [PLACE_QUERY_KEY],
        });
        queryClient.invalidateQueries({
          queryKey: [PLACES_ADMIN_QUERY_KEY],
        });
        closeDeleteModal();
      },
      onError: closeDeleteModal,
    });
  };

  const handleUpdateSubmit = () => {
    updatePlaceRef.current?.submit(); // Trigger form submission
  };

  return (
    <>
      <button
        onClick={openEditModal}
        className="w-fit hover:underline hover:text-primary font-medium text-gray-500"
      >
        Cập nhật
      </button>
      <button
        onClick={openDeleteModal}
        className="w-fit hover:underline hover:text-primary font-medium text-gray-500"
      >
        Xoá
      </button>
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        className="w-11/12 sm:w-1/2 xl:w-1/3"
      >
        <div className="flex gap-5">
          <div className="flex items-center justify-center bg-gray-100 w-12 p-2 rounded-md">
            <i className="text-red-500 fa-xl fa-regular fa-circle-xmark"></i>
          </div>
          <div>
            <p className="text-lg">Xác nhận xoá</p>
            <p className="text-gray-500">Hành động này không thể hoàn tác</p>
          </div>
        </div>
        <div className="flex gap-3 mt-7">
          <Button className="w-full" variant="ghost" onClick={closeDeleteModal}>
            Trở lại
          </Button>
          <Button
            className="w-full"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Đang xoá..." : "Đồng ý"}
          </Button>
        </div>
      </ConfirmModal>
      <CustomModal
        title="Cập nhật địa điểm"
        isOpen={isEditOpen}
        onClose={closeEditModal}
        saveButtonTitle="Cập nhật"
        className="w-11/12 lg:w-1/2"
        isPending={isPending}
        onActiveClick={handleUpdateSubmit}
        onInactiveClick={closeEditModal}
      >
        <UpdatePlace
          id={id}
          onCloseModal={closeEditModal}
          ref={updatePlaceRef}
          setIsPending={setIsPending}
        />
      </CustomModal>
    </>
  );
}

export default StatusChange;
