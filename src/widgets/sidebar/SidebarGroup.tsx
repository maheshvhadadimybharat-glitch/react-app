import { sidebarMenu } from "./sidebar.config";
import SidebarItem from "./SidebarItem";
import { userAuthStore } from "../../app/store/auth.store";
import styles from "./Sidebar.module.css";

const SidebarGroup = () => {
  const user = userAuthStore((state)=> state.user)


  type SidebarItemType = {
    label: string;
    href?: string;
    icon?: any;
    roles?: string[];
    children?: SidebarItemType[];
  };

  const filterMenu = (items: SidebarItemType[]): SidebarItemType[] => {
  return items
    .filter((item) => {
      if (!item.roles) return true;
      return item.roles.includes(user?.role || "");
    })
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: filterMenu(item.children), // recursion
        };
      }
      return item;
    });
};

  
  return (
    <ul className={`${styles.items}`}>
      {sidebarMenu.map((item, index)=>(
        <SidebarItem key={index} {...item}/>
      ))}
    </ul>
  )
}

export default SidebarGroup