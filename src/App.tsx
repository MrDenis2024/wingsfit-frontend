import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import Register from "./features/users/Register";
import OneTrainer from "./features/trainers/components/OneTrainer.tsx";

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
          <Route
            path="/trainers/:id"
            element={
              <>
                <OneTrainer />
              </>
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
