"use client";

import React from "react";
import NavLinks from "@/components/NavLinks";
import { authClient, signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };


  return (
    <header className="max-w-6xl mx-auto w-full">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-green-700 p-3 rounded-2xl shrink-0">
              <img className="w-10 h-10" src="/logo-icon.png" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <a className="font-bold text-3xl">বাজার দর</a>
              <div className="text-gray-600">{date}</div>
            </div>
          </div>
        </div>

        {/* User Session with Profile Dropdown / Sign in / Sign up */}
        <div className="navbar-end">
          {session?.user ? (
            <div className="dropdown dropdown-end">
              {/* Trigger Profile Info */}
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-full hover:bg-gray-100 transition select-none"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={
                      session.user.image ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt={session.user.name || "User Profile"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium text-gray-800 text-sm hidden sm:inline">
                  {session.user.name}
                </span>
                <span className="text-xs text-gray-500">▾</span>
              </div>

              {/* Dropdown Card */}
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-2xl z-[100] mt-3 w-64 p-3 shadow-xl border border-gray-100 space-y-1"
              >
                <li className="px-3 py-2 border-b border-gray-100 mb-1 pointer-events-none">
                  <p className="font-bold text-gray-900 text-sm m-0 p-0">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate m-0 p-0">
                    {session.user.email}
                  </p>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="py-2.5 px-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl flex items-center gap-2"
                  >
                    👤 আমার প্রোফাইল
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="py-2.5 px-3 text-red-600 font-medium hover:bg-red-50 rounded-xl w-full text-left cursor-pointer flex items-center gap-2"
                  >
                    ↩ সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in" className="btn btn-sm">
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                className="btn btn-sm bg-green-700 text-white hover:bg-green-800"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;