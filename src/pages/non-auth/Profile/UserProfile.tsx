import { userDetailData } from "@/assets/data/user.data";
import Avatar from "@/components/Avatar/Avatar";
import CharacteristicItem from "@/components/CharacteristicItem/CharacteristicItem";
import Divider from "@/components/Divider/Divider";
import IconText from "@/components/IconText/IconText";
import { UserDetail } from "@/models/user.interface";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Profile.css";
import Cover from "./components/Cover";
import NameWCategories from "./components/NameWCategories";
import ContactContainer from "./components/ContactContainer";
import { placeData } from "@/assets/data/place.data";
import CheckinPlace from "./components/CheckinPlace";

interface UserProfileProps {
  user?: UserDetail;
}

function UserProfile({ user = userDetailData }: UserProfileProps) {
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
                    text={user.distance.toString() + " km"}
                    className="font-medium"
                    iconClasses="w-5"
                  />
                  <IconText
                    icon="fa-location-dot"
                    text={user.city}
                    className="font-medium"
                    iconClasses="w-5"
                  />
                </div>
              </div>
              <Divider orientation="horizontal" />
              <div>
                <p className="font-medium text-gray-400">TÍNH CÁCH</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.characteristics.map((characteristic, index) => (
                    <CharacteristicItem key={index} text={characteristic} />
                  ))}
                </div>
              </div>
            </ContactContainer>
          </div>
          <div className="mt-7 lg:mt-0 lg:col-span-2">
            <Tabs>
              <TabList className="flex text-gray-600">
                <Tab className="cursor-pointer py-2 px-5 transition-colors duration-500">
                  Mô tả
                </Tab>
                <Tab className="cursor-pointer py-2 px-5 transition-colors duration-500">
                  Ảnh chi tiết
                </Tab>
              </TabList>

              <TabPanel className="mt-4">
                <p>{user.description}</p>
              </TabPanel>
              <TabPanel className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={user.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      <CheckinPlace name={user.name} places={placeData} />
    </div>
  );
}

export default UserProfile;
