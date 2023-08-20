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

const Details = ({
  formData = {},
  control,
  setFormData,
  handleSubmit,
  reset,
}) => {
  const [csvData, setCsvData] = useState([]);
  const [calculateMinMax, setCalculateMinMax] = useState({});
  console.log(csvData);

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];

  //   Papa.parse(file, {
  //     header: true,
  //     complete: (results) => {
  //       setCsvData(results.data);
  //     },

  //   });
  // };

  // const handleFileUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const text = await file.text();
  //     console.log("text", text);
  //     Papa.parse(text, {
  //       delimiter: "\t",
  //       header: true,
  //       complete: (result) => {
  //         const data = result.data;
  //         console.log("data", data);
  //         let max_x = -Infinity;
  //         let min_x = Infinity;
  //         let max_y = -Infinity;
  //         let min_y = Infinity;
  //         let max_z = -Infinity;
  //         let min_z = Infinity;

  //         for (const row of data) {
  //           const x = parseFloat(row.X);
  //           const y = parseFloat(row.Y);
  //           const z = parseFloat(row.Z);

  //           if (!isNaN(x)) {
  //             max_x = Math.max(max_x, x);
  //             min_x = Math.min(min_x, x);
  //           }

  //           if (!isNaN(y)) {
  //             max_y = Math.max(max_y, y);
  //             min_y = Math.min(min_y, y);
  //           }

  //           if (!isNaN(z)) {
  //             max_z = Math.max(max_z, z);
  //             min_z = Math.min(min_z, z);
  //           }
  //         }

  //         setCsvData({ max_x, min_x, max_y, min_y, max_z, min_z });
  //       },
  //     });
  //   }
  // };
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

      const max_x = Math.max(...numericData.map((row) => row.X));
      const min_x = Math.min(...numericData.map((row) => row.X));
      const max_y = Math.max(...numericData.map((row) => row.Y));
      const min_y = Math.min(...numericData.map((row) => row.Y));
      const max_z = Math.max(...numericData.map((row) => row.Z));
      const min_z = Math.min(...numericData.map((row) => row.Z));

      setCsvData({ max_x, min_x, max_y, min_y, max_z, min_z });
    }
  };

  // get csv file minimum and maximum value

  return (
    <Box>
      {/* previous project details data */}
      <Paper sx={{ p: "40px", mt: "100px" }}>
        {Object.entries(formData).map(([key, value], idx, arr) => {
          const title = key.replace("_", " ");
          return (
            <Box sx={{ mb: arr.length - 1 === idx ? "0px" : "35px" }}>
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
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        sx={{ p: "40px", mt: "30px" }}
      >
        <Button
          variant="button2"
          onChange={handleFileUpload}
          sx={{ gap: "5px" }}
        >
          Upload Csv
          <input type="file" accept=".csv" />
        </Button>
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
            render={({ field, fieldState: { error } }) => (
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
            render={({ field, fieldState: { error } }) => (
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
            render={({ field, fieldState: { error } }) => (
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
            render={({ field, fieldState: { error } }) => (
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
            name={"max_Z"}
            control={control}
            defaultValue={""}
            rules={{
              required: {
                value: true,
                message: "Max Z is required",
              },
            }}
            render={({ field, fieldState: { error } }) => (
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
            render={({ field, fieldState: { error } }) => (
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
