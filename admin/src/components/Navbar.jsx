
import { UserButton } from "@clerk/react";
import { useLocation } from "react-router";
import {
  ClipboardListIcon,
  HomeIcon,
  PanelLeftIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle.jsx";

export const NAVIGATION = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon className="size-5" />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <ShoppingBagIcon className="size-5" />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <ClipboardListIcon className="size-5" />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <UsersIcon className="size-5" />,
  },
];

function Navbar() {
  const location = useLocation();

  const currentPage =
    NAVIGATION.find((item) => item.path === location.pathname)?.name ??
    "Dashboard";

  return (
    <div className="navbar w-full bg-base-300 px-4">
      {/* Tombol Sidebar */}
      <label
        htmlFor="my-drawer"
        className="btn btn-square btn-ghost"
        aria-label="open sidebar"
      >
        <PanelLeftIcon className="size-5" />
      </label>

      {/* Judul Halaman */}
      <div className="flex-1 px-4">
        <h1 className="text-xl font-bold">
          {currentPage}
        </h1>
      </div>

      {/* Theme dan Profil Admin */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;
