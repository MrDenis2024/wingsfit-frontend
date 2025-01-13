import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/userSlice.ts";
import TrainerMainPage from "./components/TrainerMainPage.tsx";
import ClientMainPage from "./components/ClientMainPage.tsx";
import { Container } from "@mui/material";
import AdminPanel from "../admin/admins/AdminPanel.tsx";

const MainPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {user?.role === "admin" || user?.role === "superAdmin" ? (
        <AdminPanel />
      ) : user?.role === "trainer" ? (
        <TrainerMainPage />
      ) : (
        <ClientMainPage />
      )}
    </Container>
  );
};

export default MainPage;
