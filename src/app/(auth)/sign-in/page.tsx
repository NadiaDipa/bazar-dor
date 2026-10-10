"use client";
import { signIn } from "@/lib/auth-client";
import React from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const handleSignIn = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const { data: signInData, error } = await signIn.email({
        email: data.email as string,
        password: data.password as string,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        const errorMessage = 
        error.message === 'Invalid email' 
        ? "দয়া করে সঠিক ইমেইল ঠিকানা দিন!" 
        :"ইমেইল বা পাসওয়ার্ড সঠিক নয়!"
        
        toast.error(errorMessage);
        return;
      }


      toast.success('সফলভাবে লগইন হয়েছে ')
      console.log(signInData, error);
    } catch (err) {
        toast.error('কোথাও কোনো ত্রুটি ঘটেছে, আবার চেষ্টা করুন!')

    }
  };

  return (
    <div>
      <div className="min-h-screen bg-[#f2f6f3] flex flex-col items-center justify-center p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-neutral-800">সাইন ইন</h1>
          <p className="text-sm text-neutral-500 mt-1">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
          <form onClick={handleSignIn} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-neutral-700">
                  ইমেইল
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="input input-bordered w-full bg-white border-neutral-300 focus:outline-none focus:border-neutral-500 rounded-lg text-sm"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-neutral-700">
                  পাসওয়ার্ড
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                className="input input-bordered w-full bg-white border-neutral-300 focus:outline-none focus:border-neutral-500 rounded-lg text-sm"
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-[#008738] hover:bg-[#00702d] text-white border-none rounded-lg font-medium mt-2"
            >
              সাইন ইন
            </button>
          </form>

          <div className="divider text-xs text-neutral-400 my-6">অথবা</div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="btn btn-outline border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-normal rounded-lg text-xs normal-case shadow-sm"
            >
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="btn btn-outline border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-normal rounded-lg text-xs normal-case shadow-sm"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <div className="text-center mt-6 text-xs text-neutral-600">
            অ্যাকাউন্ট নেই?{" "}
            <span className="text-[#008738] font-medium hover:underline cursor-pointer">
              সাইন আপ করুন
            </span>
          </div>
        </div>

        <div className="mt-8 text-xs text-neutral-500 hover:text-neutral-700 cursor-pointer">
          ← হোম পেজে ফিরে যান
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
