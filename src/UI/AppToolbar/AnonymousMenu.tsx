import { Link, Stack, styled } from "@mui/material";

export const CustomStyledLink = styled(Link)(() => ({
  textDecoration: "none",
  fontSize: "11px",
  fontWeight: 600,
  color: "#000000",
  position: "relative",
  marginBottom: "20px",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "#ff5136",
    transform: "scaleY(0)",
    transformOrigin: "bottom",
    transition: "transform 0.75s ease",
  },
  "&:hover::after": {
    transform: "scaleY(1)",
  },
}));

const AnonymousMenu = () => {
  const handleScrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Stack direction="row" spacing={4}>
      <CustomStyledLink onClick={handleScrollToFooter}>
        Контакты
      </CustomStyledLink>
    </Stack>
  );
};

export default AnonymousMenu;
