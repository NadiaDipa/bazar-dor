"use client";

import { authClient, signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // confirm password matching
    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    // better auth
    try {
      const { data: signUpData, error } = await signUp.email({
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
      });
      console.log(signUpData, error);

      if (error) {
        const errorMessage =
          error.message || "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে!";
        toast.error(errorMessage);
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast("কোথাও কোনো ত্রুটি ঘটেছে, আবার চেষ্টা করুন!");
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
  };

 const handleGithubSignIn = async () => {
    const data = await signIn.social({
        provider: "github"
    })
}

  return (
    <div className="min-h-screen bg-[#F4F9F4] flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-600">
          বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Main Form Card */}
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <form className="space-y-4" onSubmit={handleSignUp}>
          {/* Name Field */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text text-xs sm:text-sm font-medium text-gray-700">
                নাম
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="যেমন: রহিম উদ্দিন"
              className="input input-bordered w-full text-sm bg-white border-gray-300 focus:border-green-600 focus:outline-none h-11 rounded-xl"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text text-xs sm:text-sm font-medium text-gray-700">
                ইমেইল
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full text-sm bg-white border-gray-300 focus:border-green-600 focus:outline-none h-11 rounded-xl"
              required
            />
          </div>

          {/* Password Field with Show/Hide */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text text-xs sm:text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="input input-bordered w-full text-sm bg-white border-gray-300 focus:border-green-600 focus:outline-none h-11 rounded-xl pr-14"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                {showPassword ? "লুকান" : "দেখুন"}
              </button>
            </div>
          </div>

          {/* Confirm Password Field with Show/Hide */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text text-xs sm:text-sm font-medium text-gray-700">
                পাসওয়ার্ড নিশ্চিত করুন
              </span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="আবার লিখুন"
                className="input input-bordered w-full text-sm bg-white border-gray-300 focus:border-green-600 focus:outline-none h-11 rounded-xl pr-14"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                {showConfirmPassword ? "লুকান" : "দেখুন"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 h-11 bg-[#00873E] hover:bg-[#007233] text-white font-medium text-sm rounded-xl transition-colors shadow-sm border-none cursor-pointer"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink mx-4 text-xs text-gray-400">অথবা</span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            {/* Google Icon SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.12 0 9.81 0 12s.43 3.88 1.18 5.39l4.09-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            {/* GitHub Icon SVG */}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02_0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* Already have an account link */}
        <p className="text-center text-xs text-gray-500 pt-1">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="text-[#00873E] font-semibold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
