import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { zhCN, enUS } from "@mui/material/locale";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#1d1c31", // Dark purple
      contrastText: "#111",
    },
    secondary: {
      main: "#91e6c1", // Bright teal
      contrastText: "#000",
    },
    error: {
      main: "#ff206e", // Bright pink
    },
    background: {
      paper: "#16213e",
      default: "#1a1a2e",
    },
    action: {
      hover: "#EEEEEE66",
    },
    text: {
      primary: "#ffffff", // White
      secondary: "#b8b8d4", // Light grey
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

const useAppTheme = (prefersDarkMode: boolean) => {
  return useMemo(
    () =>
      createTheme(
        {
          palette: {
            primary: {
              main: appTheme.palette.primary.main,
              contrastText: "#eee",
            },
            secondary: {
              main: appTheme.palette.secondary.main, // Bright teal
              contrastText: "#ccc",
            },
            error: {
              main: appTheme.palette.error.main, // Bright pink
            },
            background: {
              paper: prefersDarkMode ? "#16213e" : "#F8F9FA",
              default: prefersDarkMode ? "#5a5a6e" : "#F8F9FA",
            },
            action: {
              hover: prefersDarkMode ? "#EEEEEE66" : "#12121266",
            },
            text: {
              primary: prefersDarkMode ? "#ffffff" : "#0f0a0e", // White
              secondary: prefersDarkMode ? "#b8b8d4" : "#2f2a2e", // Light grey
            },
          },
          components: {
            MuiButton: {
              styleOverrides: {
                root: {},
              },
            },
          },
        },
        zhCN,
      ),
    [prefersDarkMode]
  );
};

export { useAppTheme, appTheme as theme };
