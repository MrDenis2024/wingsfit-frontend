import {
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import SearchCoursePage from "./components/SearchCoursePage.tsx";

const SearchSelectPage = () => {
  const { page } = useParams();

  return (
    <Container maxWidth="lg">
      {page === "courses" ? <SearchCoursePage/> : page === "trainers" ? <h1>Hello</h1> : <h1>Not found</h1>}
    </Container>
  );
};

export default SearchSelectPage;
