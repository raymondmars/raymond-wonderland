'use client'
import styles from "./index.module.css";
import { usePathname } from "next/navigation";

export interface MenuItem {
  title: string;
  link: string;
  aliasCollection?: string[];
}

export default function RootMenu({menuItems}: {menuItems: MenuItem[]}) {

  const urlPath = usePathname();
  // console.log("urlPath:", urlPath, menuItems)

  const inAliasCollection = (aliasCollection: string[], urlPath: string) => {
    if(urlPath === '') {
      return false
    }
    for(let alias of aliasCollection) {
      if(urlPath.indexOf(alias) >= 0) {
        return true
      }
    }
    return false
  }
  
  return (
    <div>
      <ul className={styles.menu}>
        {
          menuItems.map((item, index) => {
            if(item.link === urlPath || (item.link !== '/' && (urlPath?.startsWith(item.link) || (item.aliasCollection && inAliasCollection(item.aliasCollection, urlPath as string))))) {
              return <li key={index} className={styles.active}><a href={item.link}>{item.title}</a></li>
            }
            
            return (
              <li key={index}><a href={item.link}>{item.title}</a></li>
            )
          })
        }
      </ul>
    </div>
  )
}
