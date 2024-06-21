import "./globals.css";
import RootMenu from "./components/RootMenu"
import { Abril_Fatface, Libre_Franklin } from 'next/font/google'

const libre = Libre_Franklin({ subsets: ['latin']})
const abril_fatface = Abril_Fatface({ weight: "400", subsets: ["latin-ext"]})

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const homeMenuItems = [
    { title: "Home", link: "/" },
    { title: "Insights", link: "/insights" },
    { title: "Tools", link: "/tools", aliasCollection: ["ielts-writing-ai-examiner"] },
  ]

  const titleStyle = `${abril_fatface.className} title`

  return (
    <div className={libre.className}>
        <h1 className={titleStyle}>Raymond's Wonderland</h1>
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
