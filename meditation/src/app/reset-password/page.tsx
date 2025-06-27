
'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Button } from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("recoverEmail");
    if (!storedEmail) {
      setMessage("❌ Email not found. Please retry the forgot password process.");
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (password !== confirm) {
      setMessage("❌ Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reset-password"`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: { error?: string } = await res.json();

      if (res.ok) {
        setMessage("✅ Password updated successfully. Redirecting to login...");
        sessionStorage.removeItem("recoverEmail");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Left Panel */}
      <div className="w-[43%] bg-slate-900 flex flex-col p-8">
        {/* Logo */}
        <div className="mb-8">
          <Image src="/logo.png" alt="Logo" height={200} width={150} />
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-3">Create New Password</h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create a new password of at least 8 characters long.
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter New Password"
                  className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                className="w-full h-12 rounded-xl py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>

            {message && (
              <div className="text-center">
                <p className="text-sm text-green-400">{message}</p>
              </div>
            )}
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
            objectPosition: "center"
          }}
          className="rounded-3xl p-2"
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
