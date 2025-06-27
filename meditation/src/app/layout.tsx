import "./globals.css";
import AuthProvider from "../app/provider";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Your App",
  description: "Authentication example",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
         <Toaster position="top-center" reverseOrder={false} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
