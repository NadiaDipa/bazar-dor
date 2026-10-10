"use client";
import { signIn } from "@/lib/auth-client";
import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";

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
        ? "দয়া করে সঠিক ইমেল ঠিকানা দিন!" 
        : "ইমেল বা পাসওয়ার্ড সঠিক নয় !";
        
        toast.error(errorMessage);
        return;
      }

      toast.success('সফলভাবে লগিন হয়েছে!');
      console.log(signInData, error);
    } catch (err) {
      toast.error('কোথাও কোনো ত্রুটি ঘটেছে, আবার চেষ্টা করুন!');
    }
  };

  // Google social sign-in handler
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  // GitHub social sign-in handler
  const handleGithubSignIn = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
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
          {/* Email Password Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
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
                placeholder="Kompokhe 8 okhor"
                required
                className="input input-bordered w-full bg-white border-neutral-300 focus:outline-none focus:border-neutral-500 rounded-lg text-sm"
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-[#008738] hover:bg-[#00702d] text-white border-none rounded-lg font-medium mt-2 cursor-pointer"
            >
              সাইন ইন
            </button>
          </form>

          <div className="divider text-xs text-neutral-400 my-6">অথবা</div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold bg-black text-white border border-black hover:bg-[#E8F5E9] hover:text-black hover:border-black transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z" />
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.12 0 9.81 0 12s.43 3.88 1.18 5.39l4.09-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z" />
              </svg>
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            {/* GitHub Button */}
            <button
              type="button"
              onClick={handleGithubSignIn}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold bg-black text-white border border-black hover:bg-[#E8F5E9] hover:text-black hover:border-black transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02_0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <div className="text-center mt-6 text-xs text-neutral-600">
            একাউন্ট নেই?{" "}
            <Link href="/sign-up" className="text-[#008738] font-medium hover:underline cursor-pointer">
              সাইন আপ করুন
            </Link>
          </div>
        </div>

        <Link href="/" className="mt-8 text-xs text-neutral-500 hover:text-neutral-700 cursor-pointer">
          ← হোম পেজে ফিরে যান 
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;