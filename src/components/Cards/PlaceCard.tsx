import { Place } from "@/models/place.interface";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import IconText from "../IconText/IconText";
import IconBtn from "../Buttons/IconBtn";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "../Modals/ConfirmModal";
import Button from "../Buttons/Button";
import CustomModal from "../Modals/CustomModal";
import getImageUrl from "@/utils/getImageUrl";
import { useSelector } from "react-redux";
import { accountIdSelector } from "@/store/auth/auth.selector";
import { useDeletePlace } from "@/services/place.service";
import { useQueryClient } from "@tanstack/react-query";
import { PLACE_QUERY_KEY } from "@/utils/constants";
import UpdatePlace from "../Forms/UpdatePlace";
import DeleteConfirmModal from "../CustomModals/DeleteConfirmModal/DeleteConfirmModal";

function PlaceCard({ place }: { place: Place }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const updatePlaceRef = useRef<{ submit: () => void } | null>(null); // Ref for UpdatePlace
  const accountId = useSelector(accountIdSelector);
  const queryClient = useQueryClient(); // Query client for invalidating queries

  const { isPending: isDeleting, mutateAsync } = useDeletePlace();

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
    await mutateAsync(place.id, {
      onSuccess: () => {
        // Invalidate query to refetch data
        queryClient.invalidateQueries({ queryKey: [PLACE_QUERY_KEY] });
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
      <div className="flex flex-col border-2 rounded-lg relative transition-shadow duration-300 hover:shadow-xl bg-white">
        {place.ownerId === accountId && (
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <IconBtn
              onClick={openEditModal}
              effect="opacity"
              icon="fa-pen"
              size="size-9"
            />
            <IconBtn
              effect="opacity"
              icon="fa-trash"
              size="size-9"
              onClick={openDeleteModal}
            />
          </div>
        )}
        <img
          src={getImageUrl(place.cover, "cover")}
          alt={place.name}
          className="w-full min-h-40 h-40 object-cover rounded-t-md"
        />
        <Link
          to={`/place/${place.id}`}
          className="p-4 h-full flex flex-col justify-between"
        >
          <div>
            <p className="text-lg font-semibold truncate">{place.name}</p>
            <p className="line-clamp-3 text-gray-500 leading-snug">
              {place.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap justify-between items-end mt-5 gap-5">
            <div className="flex items-center gap-2 truncate">
              <Avatar
                hasBorder={false}
                src={place.ownerAvatar}
                alt={place.ownerName}
                size="size-11"
              />
              <div className="truncate">
                <p className="font-medium truncate">{place.ownerName}</p>
                <p className="text-xs font-medium text-gray-400 mt-0.5">
                  {place.dateCreated}
                </p>
              </div>
            </div>
            <IconText
              icon="fa-location-dot"
              text={place.city}
              textClasses="text-xs"
            />
          </div>
        </Link>
      </div>
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        handleDelete={handleDelete}
        isPending={isDeleting}
      />
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
          id={place.id}
          onCloseModal={closeEditModal}
          ref={updatePlaceRef}
          setIsPending={setIsPending}
        />
      </CustomModal>
    </>
  );
}

export default PlaceCard;
