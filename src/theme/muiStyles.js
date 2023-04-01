import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Baloo 2", cursive`,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "black",
          "&.Mui-focused": {
            color: "red",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderColor: "orange",
          "&::after": {
            borderColor: "orange",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          border: "2px solid black",
        },
        bar: {
          backgroundColor: "green",
        },
      },
    },
  },
});

export default theme;
