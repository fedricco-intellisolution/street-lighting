import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {AlertCircle, Bell, Home,UserPlus } from "react-feather";
import useSidebar from "../../hooks/useSidebar";
import NavbarDropdown from "./NavbarDropdown";
import NavbarDropdownItem from "./NavbarDropdownItem";
import NavbarUser from "./NavbarUser";

const notifications = [
  {
    type: "important",
    title: "Update completed",
    description: "Restart server 12 to complete the update.",
    time: "2h ago",
  },
  {
    type: "default",
    title: "Lorem ipsum",
    description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
    time: "6h ago",
  },
  {
    type: "login",
    title: "Login from 192.186.1.1",
    description: "",
    time: "6h ago",
  },
  {
    type: "request",
    title: "New connection",
    description: "Anna accepted your request.",
    time: "12h ago",
  },
];

const NavbarComponent = () => {
  const { isOpen, setIsOpen } = useSidebar();
  return (
      <Navbar variant="light" expand className="navbar-bg">
          <span
            className="sidebar-toggle d-flex"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <i className="hamburger align-self-center" />
          </span>

          <Navbar.Collapse>
            <Nav className="navbar-align">

              <NavbarDropdown
                header="New Notifications"
                footer="Show all notifications"
                icon={Bell}
                count={notifications.length}
              >
                {notifications.map((item, key) => {
                  let icon = <Bell size={18} className="text-warning" />;

                  if (item.type === "important") {
                    icon = <AlertCircle size={18} className="text-danger" />;
                  }

                  if (item.type === "login") {
                    icon = <Home size={18} className="text-primary" />;
                  }

                  if (item.type === "request") {
                    icon = <UserPlus size={18} className="text-success" />;
                  }

                  return (
                    <NavbarDropdownItem
                      key={key}
                      icon={icon}
                      title={item.title}
                      description={item.description}
                      time={item.time}
                    />
                  );
                })}
              </NavbarDropdown>

              <NavbarUser />
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    
  );
};

export default NavbarComponent;
