
import { useUser } from "@clerk/react";
import { ShoppingBagIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { NAVIGATION } from "./Navbar.jsx";

function Sidebar() {
  const location = useLocation();
  const { user } = useUser();

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer"
        aria-label="Close sidebar"
        className="drawer-overlay"
      />

      <div
        className="flex min-h-full w-64 flex-col bg-base-200
        is-drawer-close:w-14 is-drawer-open:w-64"
      >
        {/* Logo and Admin */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500">
              <ShoppingBagIcon className="size-6 text-white" />
            </div>

            <span className="text-xl font-bold is-drawer-close:hidden">
              Admin
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="menu w-full flex-1 gap-2 px-3">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  data-tip={item.name}
                  className={`rounded-xl transition-all duration-300
                    is-drawer-close:tooltip
                    is-drawer-close:tooltip-right
                    ${
                      isActive
                        ? "bg-orange-500 font-semibold text-white shadow-md shadow-orange-400/20 hover:bg-orange-400 hover:text-white"
                        : "text-base-content hover:bg-orange-300/10 hover:text-orange-300"
                    }`}
                >
                  {item.icon}

                  <span className="is-drawer-close:hidden">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Profile */}
        <div className="mt-auto border-t border-base-300 p-4">
          <div className="flex items-center gap-3">
            <div className="avatar-placeholder shrink-0">
              <img
                src={user?.imageUrl}
                alt={user?.fullName || "User profile"}
                className="size-10 rounded-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1 is-drawer-close:hidden">
              <p className="truncate text-sm font-semibold">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="truncate text-xs opacity-60">
                {user?.emailAddresses?.[0]?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


