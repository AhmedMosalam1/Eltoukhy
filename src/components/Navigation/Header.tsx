"use client";
import { links } from "@/constants/navLinks";
import Logo from "./Logo";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import Dashboard from "../sharable/Dashboard";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
  let { user } = useSelector((state: RootState) => state.login);
  let pathname = usePathname();
  return (
    <header className="bg-background/50 py-2 shadow-md shadow-primary/20 fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      <div className="w-[90%] md:w-[95%] lg:w-[80%] m-auto flex justify-between items-center gap-4">
        <Logo />
        <nav className="md:flex hidden">
          <ul className="flex items-center gap-4 lg:gap-8">
            {links.map(
              (link) =>
                link.onMobile !== false && (
                  <li
                    className={`font-semibold ${
                      pathname === link.url && "text-primary scale-105"
                    } hover:text-primary hover:scale-105 duration-300`}
                    key={link.id}>
                    <Link href={link.url}>{link.title}</Link>
                  </li>
                )
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <Link className="hidden md:flex" href={"/contact"}>
            <button className="group relative inline-block rounded overflow-hidden border border-primary px-6 py-[6px] focus:outline-none focus:ring">
              <span className="absolute inset-y-0 left-0 w-[2px] bg-primary transition-all group-hover:w-full group-active:bg-indigo-500"></span>
              <span className="relative whitespace-nowrap text-sm font-medium text-primary transition-colors group-hover:text-white">
                Call Us
              </span>
            </button>
          </Link>
          <ModeToggle />
          <div className="cursor-pointer">
            <img
              src="/ar.png"
              className="size-9 rounded-md object-cover"
              alt="ar language"
            />
          </div>
          <div className="flex md:hidden">
            <Sidebar />
          </div>

          {user?.token && !pathname.includes("dashboard") && (
            <div className=" md:hidden block">
              <Link
                href={"/admindashboard/banners"}
                className=" cursor-pointer  w-10 h-10 text-white rounded-full bg-primary flex items-center justify-center">
                <LayoutDashboard size={20} />
              </Link>
            </div>
          )}
          {user?.token && pathname.includes("dashboard") && (
            <div className="mt-1">
              <Dashboard />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
