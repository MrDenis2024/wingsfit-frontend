import React from "react";
import { Container } from "@mui/material";
import { Location, useLocation } from "react-router-dom";
import AppToolbar from "../AppToolbar/AppToolbar";
import Footer from "../Footer/Footer.tsx";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location: Location = useLocation();

  const onExcludedPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/fill-profile");

  return (
    <>
      <header>
        <AppToolbar />{" "}
      </header>
      <Container
        maxWidth={false}
        component="main"
        disableGutters
        sx={{ minHeight: "80vh" }}
      >
        {children}
      </Container>
      <footer>{!onExcludedPage && <Footer />}</footer>
    </>
  );
};

export default Layout;
