'use client';

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP has been sent to your email.");
        sessionStorage.setItem("recoverEmail", email);
        router.push("/verify-otp");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Left Panel */}
      <div className="w-[43%] bg-slate-900 flex flex-col p-8">
        <div className="mb-8">
          <Image src="/logo.png" alt="Logo" height={200} width={150} />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-3">
                Forgot Password
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enter your registered email to receive a password reset OTP.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="mb-4 w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
                className="w-full h-12 rounded-xl py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CircularProgress size={20} thickness={5} className="text-white" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[57%] relative">
        <Image
          src="/flower.jpg"
          alt="Lotus Flower"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
          className="rounded-3xl p-2"
        />
      </div>
    </div>
  );
}
