import Cover from "./components/Cover";
import Avatar from "@/components/Avatar/Avatar";
import ContactContainer from "./components/ContactContainer";
import IconText from "@/components/IconText/IconText";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CategoryItem from "@/components/CategoryItem/CategoryItem";
import Divider from "@/components/Divider/Divider";
import { Link, useParams } from "react-router-dom";
import { useGetPlaceById } from "@/services/place.service";
import Loader from "@/components/Loader/Loader";
import NotFound from "@/components/PlaceholderPages/NotFound";
import getImageUrl from "@/utils/getImageUrl";

function PlaceProfile() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetPlaceById(Number(id));
  const place = data?.data;

  if (isLoading) {
    return <Loader className="mt-10" />;
  } else if (isError) {
    return <p className="error mt-10">Lỗi, vui lòng thử lại</p>;
  }

  if (!place) {
    return <NotFound className="mt-16" type="place" />;
  }

  return (
    <div>
      <Cover src={place.images[0]} alt={place.name} />
      <div className="mx-5 lg:mx-10 mt-7">
        <p className="text-3xl font-semibold text-center lg:text-left">
          {place.name}
        </p>
        <p className="mt-1 text-gray-500 text-center lg:text-left">
          {place.shortDescription}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-4">
          <div className="col-span-1 mt-3 lg:mr-10">
            <div className="flex justify-center lg:justify-start flex-wrap gap-2">
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
                    <Link
                      to={`/user/${place.ownerId}`}
                      className="font-medium truncate hover:underline"
                    >
                      {place.ownerName}
                    </Link>
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
                  {place.address && (
                    <IconText
                      icon="fa-location-dot"
                      text={place.address}
                      className="font-medium"
                      iconClasses="w-5"
                    />
                  )}
                  {place.city && (
                    <IconText
                      icon="fa-location-dot"
                      text={place.city.name}
                      className="font-medium"
                      iconClasses="w-5"
                    />
                  )}
                </div>
              </div>
            </ContactContainer>
          </div>
          <div className="mt-7 lg:mt-0 col-span-2">
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
                {place.description ? (
                  <p>{place.description}</p>
                ) : (
                  <p>Chưa có mô tả</p>
                )}
              </TabPanel>
              <TabPanel className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {place.images &&
                  place.images.map((image, index) => (
                    <img
                      key={index}
                      src={getImageUrl(image, "cover")}
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
