import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import OneTrainer from "./features/trainers/components/OneTrainer.tsx";
import Login from "./features/users/Login.tsx";
import NewCourse from "./features/courses/NewCourse.tsx";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute.tsx";
import { useAppSelector } from "./app/hooks.ts";
import { selectUser } from "./features/users/userSlice.ts";
import AddNewLesson from "./features/lessons/AddNewLesson.tsx";
import WelcomePage from "./features/welcomePage/WelcomePage.tsx";
import OneClient from "./features/clients/components/OneClient.tsx";
import OnBoardingProfile from "./features/users/OnBoardingProfile.tsx";
import Main from "./features/main/Main.tsx";

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <WelcomePage />
              </>
            }
          />
          <Route
            path="/main"
            element={
              <>
                <Main />
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
            path="/fill-profile/:role"
            element={
              <>
                <OnBoardingProfile />
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
          <Route
            path="/add-new-course"
            element={
              <ProtectedRoute
                isAllowed={!!user.user && user.user.role === "trainer"}
              >
                <NewCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-new-lesson"
            element={
              <>
                <AddNewLesson />
              </>
            }
          />
          <Route
            path="/client/:id"
            element={
              <>
                <OneClient />
              </>
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
