import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProjectCreateForm from "../Components/Home/ProjectCreateForm";
import Details from "./Details";

const Home = ({ formData, setFormData }) => {
  const { reset, control, handleSubmit, setValue } = useForm();

  return Object.values(formData)[0] ? (
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
  );
};

export default Home;
