import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/userSlice.ts";
import TrainerMainPage from "./components/TrainerMainPage.tsx";
import ClientMainPage from "./components/ClientMainPage.tsx";

const MainPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <>{user?.role === "trainer" ? <TrainerMainPage /> : <ClientMainPage />}</>
  );
};

export default MainPage;
