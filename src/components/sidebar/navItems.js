import {
  Settings,
  Sliders,
  Package,
} from "react-feather";

const pagesSection = [
  {
    href: "/",
    icon: Sliders,
    title: "Dashboard",
  },
  {
    icon: Package,
    title: "Module",
    children: [
      {
        href: "/module/sub",
        title: "Sub module",
      },
    ],
  },
  {
    icon: Settings,
    title: "Settings",
    children: [
		{
			href: "/settings",
			title: "Settings",
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
