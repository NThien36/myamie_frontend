import { RoleEnum } from "@/models/app.interface";
import { ROLE_ROUTES } from "@/routes/route-role";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import IconText from "@/components/IconText/IconText";
import Divider from "@/components/Divider/Divider";

function Sidebar({ role }: { role: RoleEnum }) {
  const roleRoutes = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES] || [];

  return (
    <>
      {roleRoutes.map((tab, index) => (
        <div key={index} className={cx({ "mt-5": index > 0 })}>
          <p className="font-medium text-gray-500 text-xs">{tab.type}</p>
          <div className="mt-3 flex flex-col gap-1">
            {tab.routes.map((route, idx) => (
              <NavLink
                key={idx}
                to={route.path}
                className={({ isActive }) =>
                  cx("px-3 py-2.5 rounded-md hover:bg-white border-2", {
                    "bg-white border-gray-700": isActive,
                    "border-background": !isActive,
                  })
                }
              >
                <IconText
                  icon={route.icon}
                  text={route.label}
                  iconClasses="w-5"
                />
              </NavLink>
            ))}
          </div>
          {index < roleRoutes.length - 1 && (
            <Divider orientation="horizontal" className="mt-5" />
          )}
        </div>
      ))}
    </>
  );
}

export default Sidebar;
