"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCircleQuestion, FaRegCircleUser } from "react-icons/fa6";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";

const LINKS = [
  { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard, id: "wd-dashboard-link" },
  { label: "Courses", path: "/dashboard", icon: LiaBookSolid, id: "wd-course-link" },
  { label: "Calendar", path: "/calendar", icon: IoCalendarOutline, id: "wd-calendar-link" },
  { label: "Inbox", path: "/inbox", icon: FaInbox, id: "wd-inbox-link" },
  { label: "Labs", path: "/labs", icon: LiaCogSolid, id: "wd-labs-link" },
  { label: "History", path: "/history", icon: IoCalendarOutline },
] as const;

export default function KambazNavigation() {
  const pathname = usePathname() ?? "";
  const matchesRoute = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);
  const accountActive = matchesRoute("/account");
  return (
    <nav
      id="wd-kambaz-navigation"
      className="fixed bottom-0 left-0 top-0 z-20 hidden w-[120px] bg-black md:block"
    >
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        rel="noreferrer"
        className="block py-3 text-center text-sm font-bold text-red-600 no-underline"
      >
        Northeastern
      </a>
      <Link
        href="/account"
        id="wd-account-link"
        className={`block py-3 text-center text-sm no-underline ${
          accountActive ? "bg-white text-red-600" : "bg-black text-white"
        }`}
        aria-current={accountActive ? "page" : undefined}
      >
        <FaRegCircleUser className={`inline-block text-3xl ${accountActive ? "text-red-600" : "text-white"}`} />
        <br />
        Account
      </Link>
      {LINKS.map((link) => {
        const active = link.label === "Courses"
          ? matchesRoute("/courses")
          : matchesRoute(link.path);
        const Icon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.path}
            id={"id" in link ? link.id : `wd-${link.label.toLowerCase()}-link`}
            aria-current={active ? "page" : undefined}
            className={`block py-3 text-center text-sm no-underline ${
              active ? "bg-white text-red-600" : "bg-black text-white"
            }`}
          >
            <Icon className="inline-block text-3xl text-red-600" />
            <br />
            {link.label}
          </Link>
        );
      })}
      <Link
        href="/labs"
        id="wd-ai-nav-help"
        className="block bg-black py-3 text-center text-sm text-white no-underline"
      >
        <FaCircleQuestion className="inline-block text-3xl text-red-600" />
        <br />
        Help
      </Link>
    </nav>
  );
}