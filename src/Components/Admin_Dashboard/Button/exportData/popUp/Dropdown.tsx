// import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import React, { useState } from "react";

// interface DropdownProps {
//   label: string;
//   options: string[];
// }

// const Dropdown = ({ label, options }: DropdownProps) => {
//   const [value, setValue] = useState("");

//   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setValue(event.target.value as string);
//   };

//   return (

// <Box sx={{ marginBottom: "1rem" }}>
//   <FormControl
//     variant="filled"
//     fullWidth
//     sx={{
//       backgroundColor: "#303137", // Changed fill color to #303137
//       borderRadius: '15px', // Added border radius to FormControl
//       '& .MuiInputBase-root': {
//         backgroundColor: "#303137", // Ensure the input area also has the same fill color
//         borderRadius: '20px', // Added border radius to the input area
//       },
//     }}
//   >
//     <InputLabel
//       sx={{
//         color: '#fff', // Set label color to white for better contrast
//         '&.Mui-focused, &.MuiFormLabel-filled': {
//           transform: 'translate(20px, -10px) scale(1)', // Moved the label up a little more after click
//         },
//       }}
//     >
//       {label}
//     </InputLabel>
//     <Select
//       value={value}
//       onChange={handleChange}
//       label={label}
//       size="small"
//       sx={{
//         minWidth: 120,
//         backgroundColor: "#303137", // Changed fill color to #303137
//         color: '#fff', // Set text color to white for better visibility
//         borderRadius: '0px', // Added border radius to the Select component
//         '& .MuiSvgIcon-root': {
//           color: '#fff', // Change the dropdown arrow color to white
//         },
//       }}
//     >
//       {options.map((option) => (
//         <MenuItem key={option} value={option}>
//           {option}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// </Box>

//   );
// };

// export default Dropdown;

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
}

const Dropdown = ({ label, options }: DropdownProps) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ marginBottom: "1rem" }}>
      <FormControl
        variant="filled"
        fullWidth
        sx={{
          backgroundColor: "#303137", // Changed fill color to #303137
          borderRadius: "15px", // Added border radius to FormControl
          "& .MuiInputBase-root": {
            backgroundColor: "#303137", // Ensure the input area also has the same fill color
            borderRadius: "20px", // Added border radius to the input area
            "&:before, &:after": {
              borderBottom: "none", // Remove the underline (indicator line)
            },
          },
        }}
      >
        <InputLabel
          sx={{
            color: "#fff", // Set label color to white for better contrast
            top: "50%", // Vertically center the label text
            transform: "translateY(-50%)", // Adjust to keep it centered
            paddingLeft: "2%", // Add 5% left padding to the label text
            "&.Mui-focused, &.MuiFormLabel-filled": {
              top: "0", // Adjusts the position when focused or filled
              transform: "translate(10px, -10px) scale(.75)", // Moved the label up a little more after click
            },
          }}
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={handleChange}
          label={label}
          size="small"
          sx={{
            minWidth: 120,
            backgroundColor: "#303137", // Changed fill color to #303137
            color: "#fff", // Set text color to white for better visibility
            borderRadius: "0px", // Added border radius to the Select component

            "& .MuiSelect-select": {
              padding: "8px 16px", // Adjust padding for better vertical alignment
            },
            "& .MuiSvgIcon-root": {
              color: "#fff", // Change the dropdown arrow color to white
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
