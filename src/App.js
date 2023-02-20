import React, { createContext, useState } from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { store } from "./redux/store";

import "./i18n";
import routes from "./routes";

import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { LayoutProvider } from "./contexts/LayoutContext";
import { AuthProvider } from "./contexts/JWTContext";

import "./assets/custom-style.css";

export const LoadingContext = createContext();

const App = () => {
    const content = useRoutes(routes);
    const [isLoadingActive, setIsLoadingActive] = useState(false);

    return (
        <HelmetProvider>
            <Helmet titleTemplate="%s | FONDA" defaultTitle="FONDA" />
            <Provider store={store}>
                <LoadingContext.Provider
                    value={[isLoadingActive, setIsLoadingActive]}
                >
                    <ThemeProvider>
                        <SettingsProvider>
                            <SidebarProvider>
                                <LayoutProvider>
                                    <AuthProvider>{content}</AuthProvider>
                                </LayoutProvider>
                            </SidebarProvider>
                        </SettingsProvider>
                    </ThemeProvider>
                </LoadingContext.Provider>
            </Provider>
        </HelmetProvider>
    );
};

export default App;
