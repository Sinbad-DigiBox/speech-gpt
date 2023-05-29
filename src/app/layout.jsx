import Header from "@/components/Header";
import "./globals.css";
import { Overpass } from "next/font/google";

const overpass = Overpass({ subsets: ["latin"] });

export const metadata = {
  title: "Konuşa Konuşa",
  description: "Enterasan kişiliklerle konuş.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${overpass.className} mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-5 py-10`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
