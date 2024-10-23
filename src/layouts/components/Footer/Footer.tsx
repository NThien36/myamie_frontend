import Logo from "@/assets/images/Logo";
import Button from "@/components/Buttons/Button";
import IconText from "@/components/IconText/IconText";
import { ROUTE_PATH } from "@/routes/route-path";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    id: 1,
    icon: "fa-square-facebook",
    href: "https://www.facebook.com/groups/1229481658056087",
  },
  {
    id: 2,
    icon: "fa-instagram",
    href: "/",
  },
  {
    id: 3,
    icon: "fa-tiktok",
    href: "/",
  },
];

const navlinks = [
  {
    id: 1,
    name: "TRANG CHU",
    href: ROUTE_PATH.BUSINESSES,
  },
  {
    id: 2,
    name: "DIA DIEM",
    href: ROUTE_PATH.PLACES,
  },
  {
    id: 3,
    name: "BAN BE",
    href: ROUTE_PATH.USERS,
  },
  {
    id: 4,
    name: "TRO GIUP",
    href: ROUTE_PATH.BUSINESSES,
  },
];

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white px-16 border-t-2 mt-52 relative">
      <Button
        onClick={handleScrollToTop}
        className="absolute -top-6 right-12 size-11"
      >
        <i className="fa-xl fa-regular fa-arrow-up"></i>
      </Button>
      <div className="container px-10 grid grid-cols-2 gap-5 py-16">
        <Link to={ROUTE_PATH.BUSINESSES} className="m-auto">
          <Logo width={200} height={50} />
        </Link>
        <div>
          <IconText
            icon="fa-map-location-dot"
            text="Da Nang City"
            textClasses="text-base"
            iconClasses="text-primary w-7"
          />
          <div className="flex gap-12 mt-4">
            <IconText
              icon="fa-phone-alt"
              text="(+84) 123 456 789"
              textClasses="text-base"
              iconClasses="text-primary w-7"
            />
            <IconText
              icon="fa-at"
              text="myamie@gmail.com"
              textClasses="text-base"
              iconClasses="text-primary w-7"
            />
          </div>
          <div className="mt-10 flex items-center gap-10">
            <p className="text-gray-600">Kết nối thêm:</p>
            <div className="flex gap-6 text-2xl text-primary">
              {socialLinks.map((link) => (
                <Link key={link.id} to={link.href} target="_blank">
                  <i className={`fab ${link.icon}`}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-5 flex justify-between">
        <div className="flex gap-7 font-medium">
          {navlinks.map((link) => (
            <Link key={link.id} to={link.href} className="hover:underline">
              {link.name}
            </Link>
          ))}
        </div>
        <p className="text-gray-600">Bản quyền © 2024 - Công ty MYAmie</p>
      </div>
    </footer>
  );
}

export default Footer;
