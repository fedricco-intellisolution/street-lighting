import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "@hooks/useSidebar";
import SidebarNav from "./SidebarNav";

import Logo from "@images/nea-logo.png"

const Sidebar = ({ items, showFooter = true }) => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <img src={Logo} alt="NEA Logo" />
          </a>

          <SidebarNav items={items} />
        </PerfectScrollbar>
      </div>
    </nav>
  );
};

export default Sidebar;
