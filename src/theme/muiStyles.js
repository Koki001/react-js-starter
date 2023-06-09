import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"VT323", monospace',
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          textAlign: "center",
          color: "grey",
          "&.Mui-focused": {
            color: "red",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#774f38",
          minWidth: "100px",
          fontSize: "1.5rem",
          "&::after": {
            border: "none",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          border: "1px solid black",
          borderRadius: "20px",
          backgroundColor: "#f9cdad9d",
        },
        bar: {
          backgroundColor: "#6bb67d",
        },
      },
    },
  },
});

export default theme;
