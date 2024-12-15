import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/userSlice.ts";
import TrainerMainPage from "./components/TrainerMainPage.tsx";
import ClientMainPage from "./components/ClientMainPage.tsx";
import { Container } from "@mui/material";

const MainPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      {user?.role === "trainer" ? <TrainerMainPage /> : <ClientMainPage />}
    </Container>
  );
};

export default MainPage;
