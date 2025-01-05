import { Link, Stack, styled } from "@mui/material";

export const CustomStyledLink = styled(Link)(() => ({
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 600,
  color: "#000000",
  position: "relative",
  marginBottom: "20px",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-2px",
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "#ff5136",
    transform: "scaleY(0)",
    transformOrigin: "bottom",
    transition: "transform 0.75s ease, bottom 0.75s ease",
  },
  "&:hover::after": {
    transform: "scaleY(1)",
    bottom: "-5px",
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
