import {
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import SearchCoursePage from "./components/SearchCoursePage.tsx";
import SearchTrainersPage from "./components/SearchTrainersPage.tsx";

const SearchSelect = () => {
  const { page } = useParams();

  return (
    <Container maxWidth="lg">
      {page === "courses" ? (
          <SearchCoursePage/>
        ) : (
          page === "trainers" ? (
            <SearchTrainersPage />
          ) : (
            <h1>Not found</h1>
          )
      )}
    </Container>
  );
};

export default SearchSelect;
