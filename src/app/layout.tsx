import type { Metadata } from "next";
import { Open_Sans} from "next/font/google";
import "./globals.css";
import RootMenu from "./components/RootMenu";

const bod = Open_Sans({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Raymond's Wonderland",
  description: "Raymond's Wonderland, all kinds of creative insights from Raymond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const homeMenuItems = [
    { title: "Index", link: "/" },
    { title: "Insights", link: "/insights" },
    { title: "Tools", link: "/tools" },
  ];

  return (
    <html lang="en">
      <body className={bod.className}>
        <h1 className="title">Raymond's Wonderland</h1>
        <RootMenu menuItems={homeMenuItems} />
        <div className="maincontainer">
          {children}
        </div>
      </body>
    </html>
  );
}
