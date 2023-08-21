import {
  Box,
  Button,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Papa from "papaparse";
import React, { Fragment, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Details = ({
  formData = {},
  control,
  setFormData,
  handleSubmit,
  setValue,
  reset,
}) => {
  const [csvData, setCsvData] = useState([]);
  const navigate = useNavigate();

  // function for upload csv file and get csv file minimum and maximum value
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const text = await file.text();
      const parsed = Papa.parse(text, { header: true });
      const data = parsed.data;

      const numericData = data.map((row) => ({
        X: parseFloat(row.X),
        Y: parseFloat(row.Y),
        Z: parseFloat(row.Z),
      }));

      // calculate max x
      let max_x = -Infinity;
      numericData.map((row) => {
        if (row?.X > max_x) max_x = row?.X;
        setValue("max_x", max_x);
      });
      // calculate min x
      let min_x = Infinity;
      numericData.map((row) => {
        if (row?.X < min_x) min_x = row?.X;
        setValue("min_x", min_x);
      });
      // calculate max y
      let max_y = -Infinity;
      numericData.map((row) => {
        if (row?.Y > max_y) max_y = row?.Y;
        setValue("max_y", max_y);
      });
      // calculate min y
      let min_y = Infinity;
      numericData.map((row) => {
        if (row?.Y < min_y) min_y = row?.Y;
        setValue("min_y", min_y);
      });
      // calculate max z
      let max_z = -Infinity;
      numericData.map((row) => {
        if (row?.Z > max_z) max_z = row?.Z;
        setValue("max_z", max_z);
      });
      // calculate min z
      let min_z = Infinity;
      numericData.map((row) => {
        if (row?.Z < min_z) min_z = row?.Z;
        setValue("min_z", min_z);
      });

      setCsvData({ max_x, min_x, max_y, min_y, max_z, min_z });
    }
  };
  const handleCsvSubmit = (data) => {
    const submitCsvData = Boolean(data) ? data : csvData;
    setFormData((prev) => ({ ...prev, ...submitCsvData }));
    reset();
    navigate("/results");
  };
  return (
    <Box>
      {/* previous project details data */}
      <Paper sx={{ p: "40px", mt: "100px" }}>
        {Object.entries(formData).map(([key, value], idx, arr) => {
          const title = key.replace("_", " ");
          return (
            <Box key={idx} sx={{ mb: arr.length - 1 === idx ? "0px" : "35px" }}>
              <Typography
                variant="body6"
                color="textBlack"
                sx={{ textTransform: "capitalize" }}
              >
                {title}
              </Typography>
              <Typography
                variant="body6"
                color="textBlack"
                sx={{
                  border: 1,
                  borderColor: "primary.main",
                  width: 1,
                  overflowX: "auto",
                  borderRadius: "5px",
                  padding: "7px 11px",
                  mt: "10px",
                  height: "40px",
                }}
              >
                {value}
              </Typography>
            </Box>
          );
        })}
      </Paper>
      {/* max and min number input */}
      <Paper
        component={"form"}
        onSubmit={handleSubmit(handleCsvSubmit)}
        sx={{ p: "40px", mt: "30px" }}
      >
        <Box sx={{ gap: "10px", display: "flex" }}>
          <Button
            variant="button2"
            onChange={handleFileUpload}
            sx={{ gap: "5px", color: "textWhite" }}
          >
            Upload Csv
            <input type="file" accept=".csv" />
          </Button>
          <Button
            type="reset"
            variant="button4"
            onClick={() => {
              setCsvData([]), reset();
            }}
            sx={{ color: "textWhite" }}
          >
            Clear
          </Button>
        </Box>
        <Box sx={{ mt: "35px" }}>
          <Controller
            name={"max_x"}
            control={control}
            defaultValue={""}
            rules={{
              required: {
                value: true,
                message: "Max X is required",
              },
            }}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
              <Fragment>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-maxX"
                  sx={{
                    color: "textBlack",
                    fontSize: "16px",
                  }}
                >
                  Max X
                </InputLabel>
                <TextField
                  id="form-input-maxX"
                  variant="outlined"
                  type="number"
                  value={value}
                  // value={value ? value : csvData?.max_x}
                  placeholder="Max X"
                  {...field}
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  sx={{
                    border: 1,
                    borderColor: "primary.main",
                    width: 1,
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
            name={"min_x"}
            control={control}
            defaultValue={""}
            rules={{
              required: {
                value: true,
                message: "Min X is required",
              },
            }}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
              <Fragment>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-minX"
                  sx={{
                    color: "textBlack",
                    fontSize: "16px",
                  }}
                >
                  Min X
                </InputLabel>
                <TextField
                  id="form-input-minX"
                  variant="outlined"
                  type="number"
                  placeholder="Min X"
                  value={value}
                  {...field}
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  sx={{
                    border: 1,
                    borderColor: "primary.main",
                    width: 1,
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
            name={"max_y"}
            control={control}
            defaultValue={""}
            rules={{
              required: {
                value: true,
                message: "Max Y is required",
              },
            }}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
              <Fragment>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-maxY"
                  sx={{
                    color: "textBlack",
                    fontSize: "16px",
                  }}
                >
                  Max Y
                </InputLabel>
                <TextField
                  id="form-input-maxY"
                  variant="outlined"
                  type="number"
                  placeholder="Max Y"
                  value={value}
                  {...field}
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  sx={{
                    border: 1,
                    borderColor: "primary.main",
                    width: 1,
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
            name={"min_y"}
            control={control}
            defaultValue={""}
            rules={{
              required: {
                value: true,
                message: "Min Y is required",
              },
            }}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
              <Fragment>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-minY"
                  sx={{
                    color: "textBlack",
                    fontSize: "16px",
                  }}
                >
                  Min Y
                </InputLabel>
                <TextField
                  id="form-input-minY"
                  variant="outlined"
                  type="number"
                  placeholder="Min Y"
                  value={value}
                  {...field}
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  sx={{
                    border: 1,
                    borderColor: "primary.main",
                    width: 1,
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
            name={"max_z"}
            control={control}
            defaultValue={""}
            rules={{
              required: {
                value: true,
                message: "Max Z is required",
              },
            }}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
              <Fragment>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-maxZ"
                  sx={{
                    color: "textBlack",
                    fontSize: "16px",
                  }}
                >
                  Max Z
                </InputLabel>
                <TextField
                  id="form-input-maxZ"
                  variant="outlined"
                  type="number"
                  placeholder="Max Z"
                  value={value}
                  {...field}
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  sx={{
                    border: 1,
                    borderColor: "primary.main",
                    width: 1,
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
            name={"min_z"}
            control={control}
            defaultValue={""}
            rules={{
              required: {
                value: true,
                message: "Min Z is required",
              },
            }}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
              <Fragment>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-minZ"
                  sx={{
                    color: "textBlack",
                    fontSize: "16px",
                  }}
                >
                  Min Z
                </InputLabel>
                <TextField
                  id="form-input-minZ"
                  variant="outlined"
                  type="number"
                  placeholder="Min Z"
                  value={value}
                  {...field}
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  sx={{
                    border: 1,
                    borderColor: "primary.main",
                    width: 1,
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
    </Box>
  );
};

export default Details;
