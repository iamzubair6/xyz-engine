import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import ProjectCreateForm from "../Components/Home/ProjectCreateForm";
import Details from "./Details";

const Home = ({ formData, setFormData }) => {
  const { reset, control, handleSubmit, setValue } = useForm();

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {Object.values(formData)[0] ? (
        <Details
          formData={formData}
          control={control}
          setValue={setValue}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          reset={reset}
        />
      ) : (
        <ProjectCreateForm
          control={control}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          reset={reset}
        />
      )}
      ;
    </Box>
  );
};

export default Home;
