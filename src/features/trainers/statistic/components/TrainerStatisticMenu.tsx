import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";

const TrainerStatisticMenu = () => {
  return (
    <Grid>
      <List
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <ListItem sx={{ flex: "1 1 30%" }}>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/trainer/statistics/clients"
          >
            <ListItemText primary="Мои клиенты" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ flex: "1 1 30%" }}>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/trainer/statistics/groups"
          >
            <ListItemText primary="Мои группы" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ flex: "1 1 30%" }}>
          <ListItemButton
            sx={{ textAlign: "center" }}
            component={Link}
            to="/trainer/statistics/chart"
          >
            <ListItemText primary="Статистика" />
          </ListItemButton>
        </ListItem>
      </List>
    </Grid>
  );
};

export default TrainerStatisticMenu;
