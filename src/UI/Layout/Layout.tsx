import React from "react";
import { Container } from "@mui/material";
import { Location, useLocation } from "react-router-dom";
import AppToolbar from "../AppToolbar/AppToolbar";
import Footer from "../Footer/Footer.tsx";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useAppSelector(selectUser);
  const location: Location = useLocation();

  const onExcludedPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/fill-profile");
  const onExcludedMainPage = location.pathname === "/";
  const showHeader = onExcludedMainPage && !user;

  return (
    <>
      <header>{showHeader || onExcludedPage ? <></> : <AppToolbar />}</header>
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
