import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import Register from "./features/users/Register";
import OneTrainer from "./features/trainers/components/OneTrainer.tsx";
import Login from "./features/users/Login.tsx";
import Auth from "./features/auth/Auth.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/userSlice.ts";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute.tsx";

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={!!user.user}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Auth />
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
            path="/login/:role"
            element={
              <>
                <Login />
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
