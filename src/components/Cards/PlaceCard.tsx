import { Place } from "@/models/place.interface";
import { ROUTE_PATH } from "@/routes/route-path";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import IconText from "../IconText/IconText";
import { noCover } from "@/assets/images";
import IconBtn from "../Buttons/IconBtn";
import { useState } from "react";
import ConfirmModal from "../Modals/ConfirmModal";
import Button from "../Buttons/Button";
import CustomModal from "../Modals/CustomModal";
import UpsertPlace from "../Forms/UpsertPlace";

function PlaceCard({ place }: { place: Place }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);
  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  return (
    <>
      <div className="flex flex-col border-2 rounded-lg relative transition-shadow duration-300 hover:shadow-xl bg-white">
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
        <img
          src={place.cover ? place.cover : noCover}
          alt={place.name}
          className="w-full min-h-40 h-40 object-cover rounded-t-md"
        />
        <Link
          to={ROUTE_PATH.PLACE_DETAIL}
          className="p-4 h-full flex flex-col justify-between"
        >
          <div>
            <p className="text-lg font-semibold truncate">{place.name}</p>
            <p className="line-clamp-3 text-gray-500 leading-snug mt-2">
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
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        className="w-11/12 sm:w-1/2"
      >
        <div className="flex gap-5">
          <div className="flex items-center justify-center bg-gray-100 w-12 rounded-md">
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
          <Button className="w-full">Đồng ý</Button>
        </div>
      </ConfirmModal>
      <CustomModal
        title="Cập nhật địa điểm"
        isOpen={isEditOpen}
        onClose={closeEditModal}
        saveButtonTitle="Cập nhật"
        className="w-11/12 lg:w-1/2"
      >
        <UpsertPlace />
      </CustomModal>
    </>
  );
}

export default PlaceCard;
