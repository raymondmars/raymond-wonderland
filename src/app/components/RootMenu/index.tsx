'use client'

// import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";

export interface MenuItem {
  title: string;
  link: string;
}

export default function RootMenu({menuItems}: {menuItems: MenuItem[]}) {

  const urlPath = usePathname();
  // console.log("urlPath:", urlPath, menuItems)
  
  return (
    <div>
      <ul className={styles.menu}>
        {
          menuItems.map((item, index) => {
            if(item.link === urlPath || (item.link !== '/' && urlPath?.startsWith(item.link))) {
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
