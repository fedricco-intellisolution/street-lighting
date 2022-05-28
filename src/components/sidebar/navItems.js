import { Briefcase, Key, Settings, Sliders, Users, Zap } from "react-feather";

const pagesSection = [
  {
    href: "/",
    icon: Sliders,
    title: "Dashboard",
  },
  {
    href: "/fault",
    icon: Zap,
    title: "Fault Management",
    children: [
      {
        href: "/faults",
        title: "Faults",
      },
      
    ]
  },
  {
    href: "/settings",
    icon: Settings,
    title: "Settings",
    children: [
      {
        href: "/settings/users",
        title: "Users",
        icon: Users,
      },
      {
        href: "/settings/groups",
        title: "Groups",
        icon: Briefcase,
      },
       {
        href: "/settings/permissions",
        title: "Permissions",
        icon: Key,
      }
    ],
  },
];

const navItems = [
  {
    title :"Pages",
    pages : pagesSection,
  }
];

export default navItems;
