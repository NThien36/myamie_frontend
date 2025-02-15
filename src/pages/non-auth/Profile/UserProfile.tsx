import Avatar from "@/components/Avatar/Avatar";
import CharacteristicItem from "@/components/CharacteristicItem/CharacteristicItem";
import Divider from "@/components/Divider/Divider";
import IconText from "@/components/IconText/IconText";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Profile.css";
import Cover from "./components/Cover";
import NameWCategories from "./components/NameWCategories";
import ContactContainer from "./components/ContactContainer";
import CheckinPlace from "./components/CheckinPlace";
import { useParams } from "react-router-dom";
import { useGetUserById } from "@/services/user.service";
import Loader from "@/components/Loader/Loader";
import NotFound from "@/components/PlaceholderPages/NotFound";
import getImageUrl from "@/utils/getImageUrl";
import { useSelector } from "react-redux";
import {
  accountIdSelector,
  accountRoleSelector,
} from "@/store/auth/auth.selector";
import { RoleEnum } from "@/models/app.interface";
import UserFriends from "./components/UserFriends";

function UserProfile() {
  const { id } = useParams();
  const role = useSelector(accountRoleSelector);
  const currentUserId = useSelector(accountIdSelector);
  const { data, isLoading, isError } = useGetUserById(Number(id));
  const user = data?.data;

  if (isLoading) {
    return <Loader className="mt-10" />;
  } else if (isError) {
    return <p className="error mt-10">Lỗi, vui lòng thử lại</p>;
  }

  if (!user) {
    return <NotFound className="mt-16" type="user" />;
  }

  return (
    <div>
      <Cover src={user.cover} alt={user.name} />
      <div className="mx-5 lg:mx-10">
        <Avatar
          src={user.avatar}
          alt={user.name}
          size="size-40"
          className="-mt-24 border-8 mx-auto lg:mx-0"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1 mt-3 lg:mr-10">
            <NameWCategories
              name={user.name}
              shortDescription={user.shortDescription}
              categories={user.categories}
            />
            <ContactContainer>
              <div>
                <p className="font-medium text-gray-400">THÔNG TIN CHI TIẾT</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  <IconText
                    icon="fa-circle-location-arrow"
                    text={user.distance + " km"}
                    className="font-medium"
                    iconClasses="w-5 justify-center"
                  />
                  {user.city && (
                    <IconText
                      icon="fa-location-dot"
                      text={user.city}
                      className="font-medium"
                      iconClasses="w-5 justify-center"
                    />
                  )}
                </div>
              </div>
              {user.characteristics && (
                <>
                  <Divider orientation="horizontal" />
                  <div>
                    <p className="font-medium text-gray-400">TÍNH CÁCH</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {user.characteristics.map((characteristic, index) => (
                        <CharacteristicItem key={index} text={characteristic} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </ContactContainer>
          </div>
          <div className="mt-7 lg:mt-0 lg:col-span-2">
            <Tabs>
              <TabList className="flex flex-wrap text-gray-600">
                <Tab className="cursor-pointer py-2 px-5 transition-colors duration-500">
                  Mô tả
                </Tab>
                <Tab className="cursor-pointer py-2 px-5 transition-colors duration-500">
                  Ảnh chi tiết
                </Tab>
                {currentUserId === user.id && (
                  <Tab className="cursor-pointer py-2 px-5 transition-colors duration-500">
                    Bạn bè
                  </Tab>
                )}
              </TabList>

              <TabPanel className="mt-4">
                {user.description ? (
                  <p>{user.description}</p>
                ) : (
                  <p>Chưa có mô tả</p>
                )}
              </TabPanel>
              <TabPanel className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.images.length !== 0 ? (
                  user.images.map((image, index) => (
                    <img
                      key={index}
                      src={getImageUrl(image, "cover")}
                      alt={user.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))
                ) : (
                  <p>Chưa có ảnh</p>
                )}
              </TabPanel>
              {currentUserId === user.id && (
                <TabPanel>
                  <UserFriends />
                </TabPanel>
              )}
            </Tabs>
          </div>
        </div>
      </div>
      {role === RoleEnum.USER && <CheckinPlace name={user.name} id={user.id} />}
    </div>
  );
}

export default UserProfile;
