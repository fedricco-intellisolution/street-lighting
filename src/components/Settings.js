import React, { useEffect} from "react";
import { useLocation } from "react-router-dom";
import {THEME} from "../constants";
import useTheme from "../hooks/useTheme";
import useSidebar from "../hooks/useSidebar";
import useLayout from "../hooks/useLayout";
import useSettings from "../hooks/useSettings";

const themeOptions = [
  {
    name: "Default",
    value: THEME.DEFAULT,
  },
  {
    name: "Colored",
    value: THEME.COLORED,
  },
  {
    name: "Dark",
    value: THEME.DARK,
  },
  {
    name: "Light",
    value: THEME.LIGHT,
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}



const Settings = () => {
  const query = useQuery();
  const { isOpen, setIsOpen } = useSettings();
  const { theme, setTheme } = useTheme();
  const {  setPosition, setBehavior } = useSidebar();
  const { setLayout } = useLayout();

  const setSettingByQueryParam = (name, set) => {
    const value = query.get(name);
    if (value) {
      set(value);
    }
  };
  

  // Read from query parameter (e.g. ?theme=dark)
  // only for demo purposes
  useEffect(() => {
    setSettingByQueryParam("theme", setTheme);
    setSettingByQueryParam("sidebarPosition", setPosition);
    setSettingByQueryParam("sidebarBehavior", setBehavior);
    setSettingByQueryParam("layout", setLayout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`settings js-settings ${isOpen ? "open" : ""}`}
    >
     
      <div className="settings-panel">
        <div className="settings-content">
          <div className="settings-title d-flex align-items-center">
            <button
              type="button"
              className="btn-close float-right js-settings-toggle"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            ></button>
            <h4 className="mb-0 ms-2 d-inline-block">Theme Settings</h4>
          </div>
          <div className="settings-body">
            <div className="mb-3">
              <span className="d-block font-size-lg fw-bold">Color scheme</span>
              <span className="d-block text-muted mb-2">
                The perfect color mode for your app.
              </span>
              <div className="row g-0 text-center mx-n1 mb-2">
                {themeOptions.map(({ name, value }) => (
                  <div className="col-6" key={value}>
                    <label className="mx-1 d-block mb-1">
                      <input
                        className="settings-scheme-label"
                        type="radio"
                        name="theme"
                        value={value}
                        checked={theme === value}
                        onChange={() => setTheme(value)}
                      />
                      <div className="settings-scheme">
                        <div
                          className={`settings-scheme-theme settings-scheme-theme-${value}`}
                        ></div>
                      </div>
                    </label>
                    {name}
                  </div>
                ))}
              </div>
            </div>
            <hr/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
