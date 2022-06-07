import React from "react";
import { Dropdown } from "react-bootstrap";
import { Settings } from "react-feather";
import profile from "../../assets/img/avatars/profile.jpg";
import useAuth from "../../hooks/useAuth";

const NavbarUser = () => {
  const { user, signOut } = useAuth();
  
  const signOutHandler = async() => {
    try {
      await signOut();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block d-sm-none">
        <Dropdown.Toggle as="a" className="nav-link">
          <Settings size={18} className="align-middle" />
        </Dropdown.Toggle>
      </span>
      <span className="d-none d-sm-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          <img
            src={profile}
            className="avatar img-fluid rounded-circle me-1"
            alt="Chris Wood"
          />
          <span className="text-dark">{user?.full_name}</span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu drop="end">
        <Dropdown.Item>
          My profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          Theme settings
        </Dropdown.Item>
        <Dropdown.Item onClick={() => signOutHandler()}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUser;
