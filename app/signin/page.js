"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/libs/supabase/client";
import toast from "react-hot-toast";
import config from "@/config";
import Header from "@/components/Header";

// This is a login/signup page for Supabase Auth.
// Successful login redirects to /api/auth/callback where the Code Exchange is processed (see app/api/auth/callback/route.js).
export default function Login() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSignup = async (e, options) => {
    e?.preventDefault();

    setIsLoading(true);

    try {
      const { type, provider } = options;
      const redirectURL = window.location.origin + "/api/auth/callback";

      if (type === "oauth") {
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: redirectURL,
          },
        });
      } else if (type === "magic_link") {
        await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: redirectURL,
          },
        });

        toast.success("Check your emails!");

        setIsDisabled(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <main className="p-8 md:p-24" data-theme={config.colors.theme}>
          <div className="text-center mb-4">
            {/* JSX comment fixed */}
            <form
              className="form-control w-full space-y-4"
              onSubmit={(e) => handleSignup(e, { type: "magic_link" })}
            >
              <input
                required
                type="email"
                value={email}
                autoComplete="email"
                placeholder="youremail@whatever.com"
                className="input input-bordered w-full placeholder:opacity-60"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="btn btn-primary btn-block"
                disabled={isLoading || isDisabled}
                type="submit"
              >
                {isLoading && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
                Send Magic Link
              </button>
            </form>
          </div>
        </main>
      </Suspense>
    </>
  );
}
