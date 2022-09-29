import React from "react";
import "./body.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Body = () => {
  return (
    <div>
      <Box
        className="input"
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Enter the linkedin profile url"
          id="fullWidth"
        />
        <TextField fullWidth label="Enter auth cookie" id="fullWidth" />
      </Box>
    </div>
  );
};

export default Body;
