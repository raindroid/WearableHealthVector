import { IconButton, styled } from "@mui/material";

interface GenIconButtonProps {}

export default styled(IconButton)<GenIconButtonProps>(({ theme, disabled }) => {
  return {
    color: "#344666",
    borderRadius: 4,
    margin: 2,
    width: "24px",
    height: "24px",
    padding: "1px",
    transition: "all 225ms ease-in-out",
    "& img": {
      borderRadius: "4px",
    },
    "& svg": {
      fontSize: "1.15rem",
    },
    "&:hover": {
      background: "#f0f0ffc0",
    },
  };
});
