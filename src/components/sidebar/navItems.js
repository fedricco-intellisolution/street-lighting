import {
  Briefcase,
  Key,
  Settings,
  Sliders,
  Users,
  Zap,
  Home,
  Shield,
  FileText,
  Package,
  Mail,
} from "react-feather";

const pagesSection = [
  {
    href: "/",
    icon: Sliders,
    title: "Dashboard",
  },
  {
    icon: FileText,
    title: "Contract management",
    href: "/contract-management",
    children: [
      {
        href: "/contract-management/contracts",
        title: "Contract",
      },
    ],
  },
  {
    icon: Home,
    title: "Property management",
    href: "/property-management",
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
    icon: Package,
    title: "Assets management",
    href: "/assets-management",
    children: [
      {
        href: "/assets-management/assets",
        title: "Assets",
      },
      {
        href: "/assets-management/create-asset",
        title: "Create asset",
      },
    ],
  },
  {
    href: "/faults",
    icon: Zap,
    title: "Fault Management",
    children: [
      {
        href: "/faults/callcentre",
        title: "Fault registration",
      },
      {
        href: "/faults/response",
        title: "Fault response",
      },
      {
        href: "/faults/followup",
        title: "Fault follow up",
      },
      {
        href: "/faults/eot-requests",
        title: "Fault EOT request (TO)",
      },
      {
        href: "/faults/eot-approval",
        title: "Fault EOT approval (NEA)",
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
      {
        href: "/faults/incident-reports",
        title: "Fault incident report",
      },
      {
        href: "/faults/summary",
        title: "Fault summary",
      },
    ],
  },
  {
    icon: Shield,
    title: "Preventive maintenance",
    href: "/preventive-maintenance",
    children: [
      {
        href: "/preventive-maintenance/checklist-pending",
        title: "Pending checklist",
      },
      {
        href: "/preventive-maintenance/joint-inspection",
        title: "Joint inspection",
      },
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
	//   {
	//     href: "/preventive-maintenance/checklist-build",
	//     title: "Build checklist",
	//   },
	  {
        href: "/preventive-maintenance/work-schedule",
        title: "Work schedule",
      },
    ],
  },
  {
    href: "/email-notification",
    icon: Mail,
    title: "Email notification",
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
