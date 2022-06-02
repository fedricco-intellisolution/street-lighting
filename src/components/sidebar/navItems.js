import {
  Briefcase,
  Key,
  Settings,
  Sliders,
  Users,
  Zap,
  Home,
  Shield,
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
        href: "/faults/callcentre",
        title: "Faults registration",
      },
      {
        href: "/faults/response",
        title: "Fault response",
      },
      {
        href: "/faults/verification-to",
        title: "Fault verification (TO)",
      },
      {
        href: "/faults/verification-nea",
        title: "Fault verification (NEA)",
      },
      {
        href: "/faults/rectified",
        title: "Fault rectified",
      },
    ],
  },
  {
    icon: Home,
    title: "Property management",
    children: [
      {
        href: "/property-management/sectors",
        title: "Sector",
      },
      {
        href: "/property-management/sites",
        title: "Site",
      },
      {
        href: "/property-management/levels",
        title: "Level",
      },
      {
        href: "/property-management/areas",
        title: "Area",
      },
    ],
  },
  {
    icon: Shield,
    title: "Preventive maintenance",
    children: [
      {
        href: "/preventive-maintenance/checklist-type",
        title: "Checklist type",
      },
      {
        href: "/preventive-maintenance/checklist-items",
        title: "Checklist items",
      },
      {
        href: "/preventive-maintenance/checklist-sub-items",
        title: "Checklist sub items",
      },
      {
        href: "/preventive-maintenance/checklist-build",
        title: "Build checklist",
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
