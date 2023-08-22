import { Box, Button, Typography } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import Papa from "papaparse";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useForm } from "react-hook-form";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Chart = () => {
  const [csvFile, setCsvFile] = useState({ datasets: [] });
  const [chartOption, setChartOption] = useState({});
  // let KP = csvFile.map((item) => parseInt(item.KP));
  // let X = csvFile.map((item) => parseInt(item.X));
  console.log(csvFile);
  const { reset } = useForm();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const text = await file.text();
      const parsed = Papa.parse(text, { header: true });
      const data = parsed.data;
      setCsvFile({
        // labels: data.map((item, index) => [item[KP]]).filter(Number),
        labels: data.map((item) => item.KP).filter(Number),
        datasets: [
          {
            label: "XYZ Engine",
            // data: data.map((item, index) => [item[X]]).filter(Number),
            data: data.map((item) => item.X).filter(Number),
            borderColor: "black",
            backgroundColor: "red",
          },
        ],
      });
      setChartOption({
        responsive: true,
        plugin: {
          legend: {
            position: true,
          },
          display: true,
          title: "demo",
        },
      });
    }
  };

  // const chartData = {
  //   labels: KP,
  //   datasets: [
  //     {
  //       label: "Y Values",
  //       data: X,
  //       fill: false,
  //       borderColor: "rgba(75,192,192,1)",
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  // };

  return (
    <Box component={"form"} sx={{ mt: "100px" }}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
              setCsvFile([]), reset();
            }}
            sx={{ color: "textWhite" }}
          >
            Clear
          </Button>
        </Box>
      </Box>
      {csvFile.datasets ? (
        <Box sx={{ mt: "20px" }}>
          <Bar height={100} options={chartOption} data={csvFile} />
        </Box>
      ) : (
        <Box sx={{ mt: "30px" }}>
          <Typography
            variant="h3"
            sx={{ color: "#EA4335E6", textAlign: "center" }}
          >
            Please upload a valid CSV file to see data chart!!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Chart;
