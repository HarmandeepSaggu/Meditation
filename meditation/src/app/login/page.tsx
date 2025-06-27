"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Button from "@mui/material/Button";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error || "Invalid credentials");
    } else if (res?.ok) {
      toast.success("Login successful");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900">
      {/* Left Panel */}
      <div className="w-full md:w-[43%] flex flex-col p-8 bg-slate-900">
        <div className="mb-8">
          <Image src="/logo.png" alt="Logo" height={200} width={150} />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-white mb-3">Sign in</h1>
            <p className="text-sm text-gray-400 mb-4">
              Please login to continue to your account.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mb-4 w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            />

            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-end mb-6">
              <button
                onClick={() => router.push("/forgot-password")}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Forgot password?
              </button>
            </div>

            <Button
              onClick={handleLogin}
              variant="contained"
              fullWidth
              className="!h-12 !rounded-xl !bg-blue-600 hover:!bg-blue-700 !text-white !font-semibold"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[57%] relative overflow-hidden rounded-r-2xl">
        <Image
          src="/flower.jpg"
          alt="Lotus Flower"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="rounded-3xl p-2"
        />
      </div>
    </div>
  );
}
