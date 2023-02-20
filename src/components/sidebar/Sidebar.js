import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "@hooks/useSidebar";
import SidebarNav from "./SidebarNav";

import Logo from "@images/fonda-logo.png";
import { Col, Row } from "react-bootstrap";

const Sidebar = ({ items, showFooter = true }) => {
    const { isOpen } = useSidebar();

    return (
        <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
            <div className="sidebar-content">
                <PerfectScrollbar>
                    <a className="sidebar-brand" href="/">
                        <Row>
                            <Col md={3}>
                                <img
                                    src={Logo}
                                    alt="NEA Logo"
                                    style={{
                                        maxWidth: "55px",
                                    }}
                                />
                            </Col>
                            <Col md={9}>
                                <p
                                    style={{ fontSize: "15px" }}
                                    className="mb-0 mt-1"
                                >
                                    Fonda Global Engineering Pte. Ltd.
                                </p>
                            </Col>
                        </Row>
                    </a>

                    <SidebarNav items={items} />
                </PerfectScrollbar>
            </div>
        </nav>
    );
};

export default Sidebar;
