import "./globals.css";
import RootMenu from "./components/RootMenu"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const homeMenuItems = [
    { title: "Home", link: "/" },
    { title: "Insights", link: "/insights" },
    { title: "Tools", link: "/tools", aliasCollection: ["ielts-writing-ai-examiner"] },
  ];

  return (
    <div>
        <h1 className="title">Raymond's Wonderland</h1>
        <RootMenu menuItems={homeMenuItems} />
        <div className="maincontainer">
          {children}
          <div className="footer">
            <p>© 2024 Raymond's Wonderland</p>
          </div>
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
    </div>
  )
}
