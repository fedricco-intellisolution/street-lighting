import React, { useEffect } from "react";

import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export const SnackbarAlert = ({ notif, setNotif }) => {
    useEffect(() => {
        if (notif.open === true) {
            const timeoutID = window.setTimeout(
                () =>
                    setNotif({
                        ...notif,
                        open: false,
                    }),
                3000
            );

            return () => window.clearTimeout(timeoutID);
        }
    }, [notif, setNotif]);

    return (
        <>
            <Alert
                className="alert-outline position-absolute top-0 end-0 me-2 mt-2"
                show={notif.open}
                variant={notif.severity}
                style={{ zIndex: 100000 }}
            >
                <div className="alert-icon">
                    <FontAwesomeIcon icon={faBell} fixedWidth />
                </div>
                <div className="alert-message">{notif.notifMsg}</div>
            </Alert>
        </>
    );
};
