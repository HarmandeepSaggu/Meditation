'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import Image from "next/image";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("recoverEmail");
    if (!storedEmail) {
      toast.error("No email found. Please start from Forgot Password.");
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP verified! Redirecting...");
        setTimeout(() => router.push("/reset-password"), 1500);
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Verification failed.");
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
              <h1 className="text-3xl font-bold text-white mb-3">Enter OTP</h1>
              <p className="text-gray-400 text-sm">Enter the OTP received in your email.</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              {/* OTP Input Boxes */}
              <div className="flex justify-center space-x-3">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 bg-transparent border border-gray-600 rounded-full text-center text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-700"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const newOtp = otp.split('');
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(''));

                      // Auto-focus next input
                      if (e.target.value && index < 5) {
                        const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                        if (nextInput) nextInput.focus();
                      }
                    }}
                    value={otp[index] || ''}
                  />
                ))}
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Verify OTP
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
          className="rounded-3xl p-2"
        />
      </div>
    </div>
  );
}
