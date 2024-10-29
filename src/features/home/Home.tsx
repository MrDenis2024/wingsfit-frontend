import { Button, Grid2 } from "@mui/material";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Grid2>
        <Grid2 display="flex" justifyContent="center" gap={2}>
          <NavLink to="/register/treiner">
            <Button variant="contained">Want to be a coach</Button>
          </NavLink>
          <NavLink to="/register/client">
            <Button variant="contained">Want to work out</Button>
          </NavLink>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Home;
