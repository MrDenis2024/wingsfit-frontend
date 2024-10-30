import React from "react";
import AppToolbar from "../AppToolbar/AppToolbar";
import { Box } from "@mui/material";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Box
          component="section"
          sx={{
            height: "100vh",
            position: "relative",
          }}
        >
          {children}
        </Box>
      </main>
    </>
  );
};

export default Layout;
