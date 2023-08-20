import { Box, Button, InputLabel, Paper, TextField } from "@mui/material";
import React, { Fragment } from "react";
import { Controller } from "react-hook-form";

const ProjectCreateForm = ({ control, setFormData, handleSubmit, reset }) => {
  return (
    <Paper
      component={"form"}
      onSubmit={handleSubmit((data) => {
        setFormData(data), reset();
      })}
      sx={{ p: "40px", mt: "100px" }}
    >
      <Box>
        <Controller
          name={"project_name"}
          control={control}
          defaultValue={""}
          rules={{
            required: {
              value: true,
              message: "Product name is required",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Fragment>
              <InputLabel
                required
                error={Boolean(error)}
                htmlFor="form-input-projectName"
                sx={{
                  color: "textBlack",
                  fontSize: "16px",
                }}
              >
                Project Name
              </InputLabel>
              <TextField
                id="form-input-projectName"
                variant="outlined"
                type="text"
                placeholder="Product Name"
                {...field}
                error={Boolean(error)}
                helperText={Boolean(error) && error?.message}
                sx={{
                  border: 1,
                  borderColor: "primary.main",
                  width: "350px",
                  borderRadius: "5px",
                  mt: "10px",
                  height: "40px",
                  "& .MuiInputBase-input": {
                    padding: "7px",
                  },
                }}
              />
            </Fragment>
          )}
        />
      </Box>
      <Box sx={{ my: "35px" }}>
        <Controller
          name={"description"}
          control={control}
          defaultValue={""}
          rules={{
            required: {
              value: true,
              message: "Product description is required",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Fragment>
              <InputLabel
                required
                error={Boolean(error)}
                htmlFor="form-input-description"
                sx={{
                  color: "textBlack",
                  fontSize: "16px",
                }}
              >
                Product Description
              </InputLabel>
              <TextField
                id="form-input-description"
                variant="outlined"
                type="text"
                placeholder="Product Description"
                {...field}
                error={Boolean(error)}
                helperText={Boolean(error) && error?.message}
                sx={{
                  border: 1,
                  borderColor: "primary.main",
                  width: "350px",
                  borderRadius: "5px",
                  mt: "10px",
                  height: "40px",
                  "& .MuiInputBase-input": {
                    padding: "7px",
                  },
                }}
              />
            </Fragment>
          )}
        />
      </Box>
      <Box>
        <Controller
          name={"client"}
          control={control}
          defaultValue={""}
          rules={{
            required: {
              value: true,
              message: "Client is required",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Fragment>
              <InputLabel
                required
                error={Boolean(error)}
                htmlFor="form-input-client"
                sx={{
                  color: "textBlack",
                  fontSize: "16px",
                }}
              >
                Client
              </InputLabel>
              <TextField
                id="form-input-client"
                variant="outlined"
                type="text"
                placeholder="Client"
                {...field}
                error={Boolean(error)}
                helperText={Boolean(error) && error?.message}
                sx={{
                  border: 1,
                  borderColor: "primary.main",
                  width: "350px",
                  borderRadius: "5px",
                  mt: "10px",
                  height: "40px",
                  "& .MuiInputBase-input": {
                    padding: "7px",
                  },
                }}
              />
            </Fragment>
          )}
        />
      </Box>
      <Box sx={{ my: "35px" }}>
        <Controller
          name={"contractor"}
          control={control}
          defaultValue={""}
          rules={{
            required: {
              value: true,
              message: "Contractor is required",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Fragment>
              <InputLabel
                required
                error={Boolean(error)}
                htmlFor="form-input-contractor"
                sx={{
                  color: "textBlack",
                  fontSize: "16px",
                }}
              >
                Contractor
              </InputLabel>
              <TextField
                id="form-input-contractor"
                variant="outlined"
                type="text"
                placeholder="Contractor"
                {...field}
                error={Boolean(error)}
                helperText={Boolean(error) && error?.message}
                sx={{
                  border: 1,
                  borderColor: "primary.main",
                  width: "350px",
                  borderRadius: "5px",
                  mt: "10px",
                  height: "40px",
                  "& .MuiInputBase-input": {
                    padding: "7px",
                  },
                }}
              />
            </Fragment>
          )}
        />
      </Box>
      <Button
        variant="button1"
        type="submit"
        fullWidth
        sx={{
          color: "textWhite",
          fontSize: "16px",
          height: "40px",
          mt: "30px",
        }}
      >
        Submit
      </Button>
    </Paper>
  );
};

export default ProjectCreateForm;
