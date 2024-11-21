import React from "react";
import {Box, Container} from "@mui/material";
import {Location, useLocation} from "react-router-dom";
import AppToolbar from "../AppToolbar/AppToolbar";
import Footer from "../Footer/Footer.tsx";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  const location: Location = useLocation();

  const onExcludedPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/fill-profile");

  const isFullPageBackground = location.pathname === "/";


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        ...(isFullPageBackground && {
          padding: 0,
          margin: 0,
        }),
      }}
    >
      <header>{!onExcludedPage && <AppToolbar/>} </header>
      <Box
        component="main"
        sx={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isFullPageBackground ? (
          children
        ) : (
          <Container>
            {children}
          </Container>
        )}
      </Box>
      <footer>{!onExcludedPage && <Footer/>}</footer>
    </Box>
  );
};

export default Layout;
