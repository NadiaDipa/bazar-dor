"use client";

import React from "react";
import NavLinks from "@/components/NavLinks";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter();
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
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
              <img className="w-10 h-10" src="/logo-icon.png" alt="" />
            </div>
            <div className="flex flex-col">
              <a className="font-bold text-3xl ">বাজার দর</a>
              <div className="text-gray-600">{date}</div>
            </div>
          </div>
        </div>

        {/* user session with signout, sign in, sign up */}
        <div className="navbar-end">
          {session?.user ? (
            <button
              onClick={handleSignOut}
              className="btn btn-error btn-sm text-white"
            >
              সাইন আউট
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <a href="/sign-in" className="btn btn-sm">
                সাইন ইন
              </a>
              <a href="/sign-up" className="btn btn-sm bg-green-700 text-white">
                সাইন আপ
              </a>
            </div>
          )}
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
