"use client"; // This is a client component 👈🏽

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  styled,
} from "@mui/material";

interface StyledButtonProps {
  empty?: number; // boolean
}

interface StyledTopBarProps {
  transparent?: number; // boolean
}

export const StyledAppBar = styled(AppBar)<StyledTopBarProps>(
  ({ theme, transparent }) => ({
    position: "sticky",
    backgroundColor: transparent
      ? "rgba(255, 255, 255, 0.9) !important"
      : "rgba(255, 255, 255, 1)",
    boxShadow: transparent
      ? "none !important"
      : "rgba(255, 255, 255, 0.2) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
    borderRadius: "1rem",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    top: "0.75rem",
    backdropFilter: "saturate(200%) blur(2rem)",
    color: "rgb(52, 71, 103)",
    display: "grid",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: "1280px",
    padding: 0,
    // border: "0.1px solid rgba(99, 50, 255)",
    "& .MuiToolbar-root": {
      minHeight: "48px",
      padding: "0 1rem",
    },
  })
);

export const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "stretch",
}));

export const StyledConnectionButton = styled(Button)<StyledButtonProps>(
  ({ empty, theme }) => ({
    // Custom CSS
    color: "white",
    padding: "4px 8px",
    margin: "0 16px",
    borderColor: "grey",
    borderWidth: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    flexGrow: 1,
    backgroundColor: "rgb(255, 255, 255)",
    border: "0.0625rem solid rgb(210, 214, 218)",
    borderRadius: "0.5rem",
    textAlign: "left",
    transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "& p": {
      position: "absolute",
      left: 36,
      right: 24,
      textTransform: "none",
      textOverflow: "ellipsis",
      overflow: "hidden",
      color: empty ? theme.palette.grey : "inherit",
    },
    "& .MuiButton-endIcon": {
      right: 12,
      position: "absolute",
      display: empty ? "none" : "block",
    },
    "& .LeftIcon": {
      position: "absolute",
      left: 12,
    },
  })
);

export const StyledConnectionMenuItem = styled(MenuItem)(({ disabled }) => ({
  minWidth: "120px",
  maxWidth: "40rem",
  color: disabled ? "lightgrey" : "black",
  transition: "all 0.25s ease-in-out",
  "&:hover": {
    backgroundColor: "#e0e0e055",
  },
}));

export const StyledLanguageMenuItem = styled(MenuItem)(({ disabled }) => ({
  color: disabled ? "lightgrey" : "black",
  transition: "all 0.25s ease-in-out",
  "&:hover": {
    backgroundColor: "#e0e0e055",
  },
}));

export const StyledAccountMenuItem = styled(MenuItem)(({ disabled }) => ({
  color: disabled ? "lightgrey" : "black",
  transition: "all 0.25s ease-in-out",
  "&:hover": {
    backgroundColor: "#e0e0e055",
  },
}));

export const StyledTransitionIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  transition: `all 0.5s ${theme.transitions.easing.easeInOut}`,
}));

export const StyledTextField = styled(TextField)(({}) => ({
  color: "white",
  margin: 0,
  flexGrow: 1,
  "& label": {
    color: "white !important",
  },
  "& .MuiOutlinedInput-root": {
    borderBottom: "1px solid grey",
    borderRadius: 0,
    color: "black !important",
  },
  "& .MuiInputBase-root": {
    borderRadius: "0.5rem",
  },
  "& input label span, .MuiFormLabel-root.MuiInputLabel-root": {
    color: "darkgray !important",
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root": {
    border: "none",
  },
  "& .MuiFormLabel-root": {
    fontSize: "0.8rem",
  },
  "& input": {
    padding: "6px",
  },
}));

export const StyledMenu = styled(Menu)(({}) => ({
  "& .MuiMenu-paper": {
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    borderRadius: "6px",
  },
  "& .MuiMenuItem-root": {
    fontSize: "0.9rem",
  },
  "& h5": {
    marginLeft: "1rem",
    marginRight: "1rem",
    fontSize: "1rem",
    fontWeight: 800,
  },
  "& a": {
    fontFamily: "inherit",
    textDecoration: "inherit",
  },
}));
