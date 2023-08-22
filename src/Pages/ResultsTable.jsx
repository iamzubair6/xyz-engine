import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ResultsTable = ({ formData = {} }) => {
  const pdfRef = useRef();
  const navigate = useNavigate();

  const downloadAsPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 600;
      const pageHeight = 400;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      const pdf = new jsPDF("l", "px");
      pdf.addImage(imgData, "PNG", 10, 20, imgWidth, imgHeight + 25);
      heightLeft -= pageHeight;
      pdf.save("project_details.pdf");
    });
  };
  return (
    <>
      {Boolean(formData.max_x) ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <TableContainer ref={pdfRef} component={Paper} sx={{ mt: "100px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell align="center">Project Description</TableCell>
                  <TableCell align="right">Client</TableCell>
                  <TableCell align="right">Contractor</TableCell>
                  <TableCell align="center">Max X</TableCell>
                  <TableCell align="center">Min X</TableCell>
                  <TableCell align="center">Max Y</TableCell>
                  <TableCell align="center">Min Y</TableCell>
                  <TableCell align="center">Max Z</TableCell>
                  <TableCell align="center">Min Z</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {formData?.project_name}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        maxWidth: "150px",
                        maxHeight: "200px",
                        overflow: "auto",
                        whiteSpace: "break-spaces",
                        fontSize: "14px",
                      }}
                    >
                      {formData?.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{formData?.client}</TableCell>
                  <TableCell align="center">{formData?.contractor}</TableCell>
                  <TableCell align="right">{formData?.max_x}</TableCell>
                  <TableCell align="right">{formData?.min_x}</TableCell>
                  <TableCell align="right">{formData?.max_y}</TableCell>
                  <TableCell align="right">{formData?.min_y}</TableCell>
                  <TableCell align="right">{formData?.max_z}</TableCell>
                  <TableCell align="right">{formData?.min_y}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="button1"
            onClick={downloadAsPDF}
            // fullWidth
            sx={{
              color: "textWhite",
              fontSize: "16px",
              height: "40px",
              mt: "30px",
            }}
          >
            Download PDF
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "100px",
          }}
        >
          <Typography variant="h3" sx={{ color: "#EA4335E6" }}>
            No data available please go to home page and submit all the
            necessary data to see data table!!!
          </Typography>
          <Button
            variant="button1"
            onClick={() => navigate("/")}
            sx={{
              color: "textWhite",
              fontSize: "16px",
              height: "40px",
              mt: "30px",
              justifyContent: "",
            }}
          >
            Go to home
          </Button>
        </Box>
      )}
    </>
  );
};

export default ResultsTable;
