import {
  Briefcase,
  Key,
  Settings,
  Sliders,
  Users,
  Zap,
  Home,
  Map,
  MapPin,
  Grid,
  Flag,
} from "react-feather";

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
    ],
  },
  {
    icon: Home,
    title: "Property management",
    children: [
      {
        href: "/property-management/sectors",
        title: "Sectors",
        icon: Map,
      },
      {
        href: "/settings/groups",
        title: "Site",
        icon: MapPin,
      },
      {
        href: "/settings/permissions",
        title: "Level",
        icon: Grid,
      },
      {
        href: "/settings/permissions",
        title: "Area",
        icon: Flag,
      },
    ],
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
      },
    ],
  },
];

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
];

export default navItems;
