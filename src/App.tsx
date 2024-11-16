import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Register from "./features/users/Register";
import OneTrainer from "./features/trainers/OneTrainer.tsx";
import Login from "./features/users/Login.tsx";
import NewCourse from "./features/courses/NewCourse.tsx";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute.tsx";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { selectUser } from "./features/users/userSlice.ts";
import AddNewLesson from "./features/lessons/AddNewLesson.tsx";
import WelcomePage from "./features/welcomePage/WelcomePage.tsx";
import OneClient from "./features/clients/components/OneClient.tsx";
import OnBoardingProfile from "./features/users/OnBoardingProfile.tsx";
import MainPage from "./features/main/MainPage.tsx";
import { useEffect } from "react";
import { getTrainerProfile } from "./features/trainers/trainersThunks.ts";
import { getClientProfile } from "./features/clients/clientThunk.ts";
import Layout from "./UI/Layout/Layout.tsx";
import ClientStatistics from "./features/admin/clients/ClientStatistics.tsx";
import OneCourse from "./features/courses/OneCourse.tsx";

const App = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (user && user.role === "trainer") {
        void dispatch(getTrainerProfile(user._id)).unwrap();
      } else if (user && user.role === "client") {
        void dispatch(getClientProfile(user._id)).unwrap();
      }
    } catch (e) {
      console.error(e);
    }
  }, [user, dispatch]);

  return (
    <>
      <Layout>
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
                  <MainPage />
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
                <ProtectedRoute isAllowed={!!user && user.role === "trainer"}>
                  <NewCourse />
                </ProtectedRoute>
              }
            />
            <Route path="/courses/:id" element={
              <>
                <OneCourse/>
              </>
            }/>
            <Route
              path="/add-new-lesson"
              element={
                <>
                  <AddNewLesson />
                </>
              }
            />
            <Route
              path="/clients/:id"
              element={
                <>
                  <OneClient />
                </>
              }
            />
            <Route
              path="/admin/clients-stats"
              element={
                <ProtectedRoute
                  isAllowed={
                    user &&
                    (user.role === "admin" || user.role === "superAdmin")
                  }
                >
                  <ClientStatistics />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Layout>
    </>
  );
};

export default App;
