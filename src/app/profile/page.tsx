"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, refetch } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name,
      });

      if (error) {
        toast.error(error.message || "আপডেট করতে সমস্যা হয়েছে!");
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
        await refetch();
        router.refresh();
      }
    } catch (err) {
      toast.error("কোথাও কোনো ত্রুটি ঘটেছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f6f3] p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Title */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-700 cursor-pointer mb-2 inline-block"
          >
            ← হোম পেজে ফিরে যান
          </Link>
          <h1 className="text-3xl font-bold text-neutral-800">আমার প্রোফাইল</h1>
          <p className="text-sm text-neutral-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Top User Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-neutral-200 shrink-0 bg-neutral-100">
              <img
                src={
                  session?.user?.image ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt={session?.user?.name || "User Profile"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800">
                {session?.user?.name || "User Name"}
              </h2>
              <p className="text-sm text-neutral-500">
                {session?.user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>↩ সাইন আউট</span>
          </button>
        </div>

        {/* Bottom Update Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <h3 className="text-lg font-bold text-neutral-800 mb-6">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium text-neutral-700">
                  নাম
                </span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                className="input input-bordered w-full bg-white border-neutral-300 focus:outline-none focus:border-neutral-500 rounded-xl text-sm py-3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#008738] hover:bg-[#00702d] text-white rounded-xl font-medium transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;