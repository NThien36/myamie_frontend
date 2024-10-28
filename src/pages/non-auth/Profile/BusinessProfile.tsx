import { businessDetailData } from "@/assets/data/business.data";
import { BusinessDetail } from "@/models/business.interface";
import Cover from "./components/Cover";
import Avatar from "@/components/Avatar/Avatar";
import NameWCategories from "./components/NameWCategories";
import ContactContainer from "./components/ContactContainer";
import IconText from "@/components/IconText/IconText";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "./Profile.css";

interface BusinessProfileProps {
  business?: BusinessDetail;
}

function BusinessProfile({
  business = businessDetailData,
}: BusinessProfileProps) {
  return (
    <div>
      <Cover src={business.cover} alt={business.name} />
      <div className="mx-10">
        <Avatar
          src={business.avatar}
          alt={business.name}
          size="size-40"
          className="-mt-24 border-8"
        />
        <div className="grid grid-cols-3">
          <div className="col-span-1 mt-3 mr-10">
            <NameWCategories
              name={business.name}
              shortDescription={business.shortDescription}
              categories={business.categories}
            />
            <ContactContainer>
              <div>
                <p className="font-medium text-gray-400">THÔNG TIN CHI TIẾT</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  <IconText
                    icon="fa-phone"
                    text={business.phone}
                    className="font-medium"
                    iconClasses="w-5"
                  />
                  <IconText
                    icon="fa-location-dot"
                    text={business.address}
                    className="font-medium"
                    iconClasses="w-5"
                  />
                  <IconText
                    icon="fa-clock"
                    text={business.operatingHours}
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
                <p>{business.description}</p>
              </TabPanel>
              <TabPanel className="mt-4 grid grid-cols-2 gap-3">
                {business.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={business.name}
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

export default BusinessProfile;
