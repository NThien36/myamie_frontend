import { placeDetailData } from "@/assets/data/place.data";
import { PlaceDetail } from "@/models/place.interface";
import Cover from "./components/Cover";
import { noCover } from "@/assets/images";
import Avatar from "@/components/Avatar/Avatar";
import ContactContainer from "./components/ContactContainer";
import IconText from "@/components/IconText/IconText";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CategoryItem from "@/components/CategoryItem/CategoryItem";
import Divider from "@/components/Divider/Divider";

interface PlaceProfileProps {
  place?: PlaceDetail;
}

function PlaceProfile({ place = placeDetailData }: PlaceProfileProps) {
  return (
    <div>
      <Cover src={noCover} alt={place.name} />
      <div className="mx-10 mt-7">
        <p className="text-3xl font-semibold">{place.name}</p>
        <p className="mt-1 text-gray-500">{place.shortDescription}</p>
        <div className="grid grid-cols-3">
          <div className="col-span-1 mt-3 mr-10">
            <div className="flex flex-wrap gap-2">
              {place.categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
            <ContactContainer>
              <div>
                <p className="font-medium text-gray-400">NGƯỜI ĐĂNG</p>
                <div className="flex items-center gap-2 truncate mt-3">
                  <Avatar
                    hasBorder={false}
                    src={place.ownerAvatar}
                    alt={place.ownerName}
                    size="size-10"
                  />
                  <div className="truncate">
                    <p className="font-medium truncate">{place.ownerName}</p>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">
                      {place.dateCreated}
                    </p>
                  </div>
                </div>
              </div>
              <Divider orientation="horizontal" />
              <div>
                <p className="font-medium text-gray-400">THÔNG TIN CHI TIẾT</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  <IconText
                    icon="fa-location-dot"
                    text={place.address}
                    className="font-medium"
                    iconClasses="w-5"
                  />
                  <IconText
                    icon="fa-location-dot"
                    text={place.city}
                    className="font-medium"
                    iconClasses="w-5"
                  />
                </div>
              </div>
            </ContactContainer>
          </div>
          <div className="col-span-2">
            <Tabs>
              <TabList className="flex text-gray-600">
                <Tab className="cursor-pointer py-2 px-5 transition-colors duration-500">
                  Mô tả
                </Tab>
                <Tab className="cursor-pointer py-2 px-5 transition-colors duration-500">
                  Ảnh chi tiết
                </Tab>
                <Tab className="cursor-pointer py-2 px-5 transition-colors duration-500">
                  Đánh giá
                </Tab>
              </TabList>

              <TabPanel className="mt-4">
                <p>{place.description}</p>
              </TabPanel>
              <TabPanel className="mt-4 grid grid-cols-2 gap-3">
                {place.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={place.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceProfile;
