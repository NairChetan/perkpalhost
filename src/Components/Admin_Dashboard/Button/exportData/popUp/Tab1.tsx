// import DateRangePickExport from "./DateRangePickExport";
// import Dropdown from "./Dropdown";
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import { useState } from "react";
// import axios from "axios";
// import { SelectChangeEvent } from "@mui/material";
// import * as XLSX from "xlsx"; // Import xlsx for Excel export

// // Function to format date to yyyy-MM-dd'T'HH:mm:ss
// const formatDate = (date: Date): string => {
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");
//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   const seconds = date.getSeconds().toString().padStart(2, "0");

//   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
// };

// // Define a type for the API data
// interface ApiData {
//   [key: string]: string | number | boolean; // Adjust based on your actual API data structure
// }

// const Tab1 = () => {
//   // State to store the selected date range and chart type
//   const [selectedDateRange, setSelectedDateRange] = useState<{
//     startDate: Date | null;
//     endDate: Date | null;
//   }>({
//     startDate: null,
//     endDate: null,
//   });

//   const [selectedChart, setSelectedChart] = useState<string>("Employee Chart"); // Default chart type

//   // State to store API response data
//   const [apiData, setApiData] = useState<ApiData[]>([]);

//   // State to track visibility of the data table
//   const [isDataVisible, setIsDataVisible] = useState<boolean>(false);

//   // Handler for date range change
//   const handleDateRangeChange = (startDate: Date, endDate: Date) => {
//     setSelectedDateRange({ startDate, endDate }); // Update the state with the selected date range
//   };

//   // Handler for chart selection change
//   const handleChartChange = (event: SelectChangeEvent<string>) => {
//     setSelectedChart(event.target.value); // Update the state with the selected chart type
//   };

//   // Function to fetch data from the API
//   const fetchData = async () => {
//     if (selectedDateRange.startDate && selectedDateRange.endDate) {
//       const formattedStartDate = formatDate(selectedDateRange.startDate);
//       const formattedEndDate = formatDate(selectedDateRange.endDate);

//       try {
//         let apiUrl = "";
//         if (selectedChart === "Employee Chart") {
//           apiUrl =
//             "http://localhost:8080/api/v1/employee/api/v1/employees/by-points-full-details";

//           const response = await axios.get(apiUrl, {
//             params: {
//               initialDate: formattedStartDate,
//               endDate: formattedEndDate,
//             },
//           });

//           return response.data;
//         } else if (selectedChart === "DU Chart") {
//           apiUrl = "http://localhost:8080/api/v1/du/points";

//           const response = await axios.get(apiUrl, {
//             params: {
//               startDate: formattedStartDate,
//               endDate: formattedEndDate,
//             },
//           });

//           return response.data;
//         }
//       } catch (error) {
//         console.error("API Error:", error);
//         return [];
//       }
//     } else {
//       console.log("No date range selected");
//       return [];
//     }
//   };

//   // Handler for Preview button click
//   const handlePreviewClick = async () => {
//     if (isDataVisible) {
//       // If data is already visible, hide it
//       setIsDataVisible(false);
//       setApiData([]); // Clear the API data when hiding
//     } else {
//       // Fetch data and display it
//       const data = await fetchData();
//       setApiData(data); // Store response data for table display
//       setIsDataVisible(true); // Show the data table
//     }
//   };

//   // Handler for Export button click
//   const handleExportClick = async () => {
//     let data = apiData;

//     // If there's no data in state, fetch it first
//     if (data.length === 0) {
//       data = await fetchData();
//     }

//     if (data.length > 0) {
//       // Convert the API data to a format suitable for Excel
//       const dataForExcel = data.map((row) => {
//         const formattedRow: { [key: string]: string | number | boolean } = {};
//         Object.keys(row).forEach((key) => {
//           formattedRow[key] = row[key];
//         });
//         return formattedRow;
//       });

//       // Create a new workbook and add the data
//       const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

//       // Export the workbook as an Excel file
//       XLSX.writeFile(workbook, "data_export.xlsx");
//     } else {
//       console.log("No data to export.");
//     }
//   };

//   return (
//     <>
//       <Dropdown
//         label="Select Chart"
//         options={["Employee Chart", "DU Chart"]}
//         value={selectedChart} // Pass the selected value
//         onChange={handleChartChange} // Pass the change handler
//       />

//       <DateRangePickExport onDateRangeChange={handleDateRangeChange} />

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handlePreviewClick} // Added click handler
//         sx={{
//           width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
//           px: "2%",
//           marginTop: "1rem",
//           backgroundColor: "#303137",
//           borderRadius: "15px", // Button color
//           "&:hover": {
//             backgroundColor: "black", // Hover color
//           },
//           display: "flex", // Ensures content is aligned properly
//           justifyContent: "center", // Centers the content horizontally
//           alignItems: "center", // Centers the content vertically
//         }}
//       >
//         Preview
//         <ArrowDropDownIcon sx={{ marginLeft: "0.2rem" }} />{" "}
//         {/* Added down arrow */}
//       </Button>
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{
//           width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
//           marginTop: "1.5rem",
//           backgroundColor: "#4741FC",
//           borderRadius: "15px", // Button color
//           "&:hover": {
//             backgroundColor: "black", // Hover color
//           },
//         }}
//         onClick={handleExportClick} // Add onClick handler for Export button
//       >
//         Export
//       </Button>

//       {/* Display API response data in a table */}
//       {isDataVisible && apiData.length > 0 && (
//         <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {/* Update these headers based on your API response structure */}
//                 {Object.keys(apiData[0]).map((key) => (
//                   <TableCell key={key}>{key}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {apiData.map((row, index) => (
//                 <TableRow key={index}>
//                   {Object.values(row).map((value, idx) => (
//                     <TableCell key={idx}>{String(value)}</TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </>
//   );
// };

// export default Tab1;

import DateRangePickExport from "./DateRangePickExport";
import Dropdown from "./Dropdown";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material";
import * as XLSX from "xlsx"; // Import xlsx for Excel export

// Function to format date to yyyy-MM-dd'T'HH:mm:ss
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

// Define a type for the API data
interface ApiData {
  [key: string]: string | number | boolean; // Adjust based on your actual API data structure
}

const Tab1 = () => {
  // State to store the selected date range and chart type
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [selectedChart, setSelectedChart] = useState<string>("Employee Chart"); // Default chart type

  // State to store API response data
  const [apiData, setApiData] = useState<ApiData[]>([]);

  // State to manage the Preview button toggle
  const [isPreviewed, setIsPreviewed] = useState<boolean>(false);

  // Handler for date range change
  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setSelectedDateRange({ startDate, endDate }); // Update the state with the selected date range
  };

  // Handler for chart selection change
  const handleChartChange = (event: SelectChangeEvent<string>) => {
    setSelectedChart(event.target.value); // Update the state with the selected chart type
  };

  // Function to fetch data from the API
  const fetchData = async () => {
    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      const formattedStartDate = formatDate(selectedDateRange.startDate);
      const formattedEndDate = formatDate(selectedDateRange.endDate);

      try {
        let apiUrl = "";
        if (selectedChart === "Employee Chart") {
          apiUrl =
            "http://localhost:8080/api/v1/employee/api/v1/employees/by-points-full-details";

          const response = await axios.get(apiUrl, {
            params: {
              initialDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          });

          return response.data;
        } else if (selectedChart === "DU Chart") {
          apiUrl = "http://localhost:8080/api/v1/du/points";

          const response = await axios.get(apiUrl, {
            params: {
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          });

          return response.data;
        }
      } catch (error) {
        console.error("API Error:", error);
        return [];
      }
    } else {
      console.log("No date range selected");
      return [];
    }
  };

  // Handler for Preview button click with toggle functionality
  const handlePreviewClick = async () => {
    if (isPreviewed) {
      setApiData([]); // Clear the data if already previewed
    } else {
      const data = await fetchData();
      setApiData(data); // Store response data for table display
    }
    setIsPreviewed(!isPreviewed); // Toggle the preview state
  };

  // Handler for Export button click
  const handleExportClick = async () => {
    let data = apiData;

    // If there's no data in state, fetch it first
    if (data.length === 0) {
      data = await fetchData();
    }

    if (data.length > 0) {
      // Convert the API data to a format suitable for Excel
      const dataForExcel = data.map((row) => {
        const formattedRow: { [key: string]: string | number | boolean } = {};
        Object.keys(row).forEach((key) => {
          formattedRow[key] = row[key];
        });
        return formattedRow;
      });

      // Create a new workbook and add the data
      const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      // Export the workbook as an Excel file
      XLSX.writeFile(workbook, "data_export.xlsx");
    } else {
      console.log("No data to export.");
    }
  };

  return (
    <>
      <Dropdown
        label="Select Chart"
        options={["Employee Chart", "DU Chart"]}
        value={selectedChart} // Pass the selected value
        onChange={handleChartChange} // Pass the change handler
      />

      <DateRangePickExport onDateRangeChange={handleDateRangeChange} />

      <Button
        variant="contained"
        color="primary"
        onClick={handlePreviewClick} // Added click handler
        sx={{
          width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
          px: "2%",
          marginTop: "1rem",
          backgroundColor: "#303137",
          borderRadius: "15px", // Button color
          "&:hover": {
            backgroundColor: "black", // Hover color
          },
          display: "flex", // Ensures content is aligned properly
          justifyContent: "center", // Centers the content horizontally
          alignItems: "center", // Centers the content vertically
        }}
      >
        {isPreviewed ? "Hide Data" : "Preview"}
        <ArrowDropDownIcon sx={{ marginLeft: "0.2rem" }} />{" "}
        {/* Added down arrow */}
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: { xs: "100%", sm: "40%", md: "30%", lg: "30%", xl: "25%" },
          marginTop: "1.5rem",
          backgroundColor: "#4741FC",
          borderRadius: "15px", // Button color
          "&:hover": {
            backgroundColor: "black", // Hover color
          },
        }}
        onClick={handleExportClick} // Add onClick handler for Export button
      >
        Export
      </Button>

      {/* Display API response data in a table */}
      {apiData.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Update these headers based on your API response structure */}
                {Object.keys(apiData[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, idx) => (
                    <TableCell key={idx}>{String(value)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Tab1;