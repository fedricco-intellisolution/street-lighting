import React from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { store } from "./redux/store";

import "./i18n";
import routes from "./routes";

import { ThemeProvider } from "contexts/ThemeContext";
import { SidebarProvider } from "contexts/SidebarContext";
import { LayoutProvider } from "contexts/LayoutContext";
import { AuthProvider } from "contexts/JWTContext";

import "./assets/custom-style.css"
const App = () => {
  const content = useRoutes(routes);

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | NEA-IFM"
        defaultTitle="NEA-IFM"
      />
      <Provider store={store}>
        <ThemeProvider>
          <SidebarProvider>
            <LayoutProvider>
              <AuthProvider>{content}</AuthProvider>
            </LayoutProvider>
          </SidebarProvider>
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  );
};

export default App;
