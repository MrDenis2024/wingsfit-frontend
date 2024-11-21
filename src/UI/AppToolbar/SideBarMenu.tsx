import {Box, Drawer, IconButton, Stack} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/images/logo.png";
import {CustomStyledLink} from "./AnonymousMenu.tsx";
import React from "react";
import {StyledLink} from "./AppToolbar.tsx";

interface Props {
  drawerOpen: boolean;
  closeDrawer: () => void;
}

const SideBarMenu: React.FC<Props> = ({drawerOpen, closeDrawer}) => {
  const links = [
    {label: "Расписание", to: "/"},
    {label: "Тренеры", to: "/trainers"},
    {label: "Контакты", to: "/contacts"},
  ];

  return (
    <Drawer anchor="top" open={drawerOpen} onClose={closeDrawer}>
      <Box sx={{width: "100%", backgroundColor: "black"}}>
        <Box sx={{paddingY: 3}}>
          <IconButton edge="end" size="small" onClick={closeDrawer}
                      sx={{position: "absolute", top: 8, right: 16, color: "white"}}>
            <CloseIcon/>
          </IconButton>
        </Box>

        <Stack alignItems="center" spacing={2} width="100%" sx={{backgroundColor: "white", padding: "40px"}}>
          <StyledLink to="/">
            <img src={logo} alt="Wings Fit Logo" style={{height: 50}}/>
          </StyledLink>
          <Stack sx={{padding: 0, alignItems: "center"}}>
            {links.map((link) => (
              <CustomStyledLink key={link.label} href={link.to}>{link.label}</CustomStyledLink>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Drawer>

  );
};

export default SideBarMenu;