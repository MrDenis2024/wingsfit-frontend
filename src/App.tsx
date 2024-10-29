import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import Register from "./features/users/Register";

const App = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/register/:role"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="*"
            element={<h1 className="text-center">Not found</h1>}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
