import { AppBar, Box, Container, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import "./MenuBar.css";

const MenuBar = () => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ height: "5rem", justifyContent: "center" }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <MonetizationOnIcon color="primary" sx={{ fontSize: "2.5rem" }} />
            <Typography
              variant="h5"
              noWrap
              className="menu-bar-app-title"
              sx={{
                fontWeight: 700,
                fontSize: "1.8rem",
              }}
            >
              GOODY CONVERTER
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1.5rem" }}>
            <Typography
              variant="h6"
              noWrap
              href="#converter"
              component="a"
              sx={{
                fontWeight: 700,
                fontSize: "1.2rem",
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Converter
            </Typography>
            <Typography
              variant="h6"
              noWrap
              href="#gold-section"
              component="a"
              sx={{
                fontWeight: 700,
                fontSize: "1.2rem",
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Gold
            </Typography>
            <Typography
              variant="h6"
              noWrap
              href="#currencies-section"
              component="a"
              sx={{
                fontWeight: 700,
                fontSize: "1.2rem",
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Currencies
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MenuBar;
