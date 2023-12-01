import { IconButton, styled } from "@mui/material";
import GenBox from "../GenBox/GenBox";

interface GenIconButtonProps {}

export default styled(GenBox)<GenIconButtonProps>(({ theme }) => {
  return {
    width: "2.5rem",
    height: "2.5rem",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))",
    color: "rgb(255, 255, 255)",
    borderRadius: "0.5rem",
    boxShadow:
      "rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem",
    "& svg": {
      fontSize: "1.125rem",
    },
  };
});
