"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@mui/material/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        router.push("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#1a2344]">
      {/* Left - Form */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-8 md:px-16 py-12">
        <div className="mb-16">
          <Image src="/logo.png" alt="Logo" height={200} width={150} />
        </div>

        <div className="max-w-sm">
          <h1 className="text-3xl font-bold text-white mb-3">Register</h1>
          <p className="text-sm text-gray-400 mb-8">Create your account below.</p>

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <div className="mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <Button
            variant="contained"
            fullWidth
            onClick={handleRegister}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          >
            Register
          </Button>

          <p className="text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>

      {/* Right - Image */}
      <div className="w-full md:w-[60%] relative overflow-hidden p-4">
        <div className="w-full h-full relative p-4">
          <Image
            src="/flower.jpg"
            alt="Flower"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
