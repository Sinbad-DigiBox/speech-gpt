import Header from "@/components/Header";
import "./globals.css";
import { Overpass } from "next/font/google";
import Footer from "@/components/Footer";
import { getCharacters } from "@/utils/char";

const overpass = Overpass({ subsets: ["latin"] });

export const metadata = {
  title: "Konuşa Konuşa",
  description: "Enterasan kişiliklerle konuş.",
};

export default async function RootLayout({ children }) {
  const characters = await getCharacters();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${overpass.className} mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-5 py-10`}
      >
        <Header characters={characters} />
        {children}
      </body>
    </html>
  );
}
