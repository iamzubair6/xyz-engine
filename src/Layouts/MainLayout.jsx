import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopAppBar from "../Components/Shared/TopAppBar";

const MainLayout = () => {
  // Scroll-to-top
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const drawerWidth = "290px";
  return (
    <Container maxWidth="xxl" sx={{ display: "flex" }}>
      <TopAppBar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            height: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default MainLayout;
