import { AppBar, Box, Container, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const MenuBar = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Container maxWidth="lg" sx={{ backgroundColor: "rgb(0, 0, 0)" }}>
        <Toolbar sx={{ display: "flex", gap: "1rem" }}>
          <MonetizationOnIcon color="primary" sx={{ fontSize: "2rem" }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GOODY CONVERTER
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MenuBar;
