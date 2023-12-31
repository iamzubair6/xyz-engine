import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const pages = [
  { value: "Home", link: "/" },
  { value: "Results", link: "/results" },
  { value: "Chart", link: "/chart" },
];

const TopAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "color6.main",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          XYZ Engine
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            color: "red",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ color: "textWhite" }}
          >
            <AiOutlineMenuUnfold />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none", color: "black" },
            }}
          >
            {pages.map(({ value }, idx) => (
              <MenuItem key={idx} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{value}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          XYZ Engine
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map(({ value, link }, idx) => (
            <Button
              key={idx}
              onClick={() => navigate(link)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {value}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
