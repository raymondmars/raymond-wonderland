import type { Metadata } from "next";
import "./globals.css";
import RootMenu from "./components/RootMenu";

// const bod = Open_Sans({ subsets: ["latin"], weight: '400' });

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
      <body className="rootBody">
        <h1 className="title">Raymond's Wonderland</h1>
        <RootMenu menuItems={homeMenuItems} />
        <div className="maincontainer">
          {children}
        </div>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-130360843-7`} />
        <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-130360843-7');
              `,
        }}
        />
      </body>
    </html>
  );
}
