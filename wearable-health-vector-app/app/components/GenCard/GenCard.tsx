import { IconButton, styled } from "@mui/material";
import GenBox from "../GenBox/GenBox";
import { ReactNode } from "react";

interface GenCardProps {
  children?: ReactNode;
  small?: boolean;
  sx?: any;
}

export default function GenCard({ sx, small, children }: GenCardProps) {
  return (
    <GenBox
      className="GenCard-root"
      sx={{
        color: "rgba(0, 0, 0, 0.87)",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minWidth: "0px",
        overflowWrap: "break-word",
        backgroundColor: "rgb(255, 255, 255)",
        backgroundClip: "border-box",
        border: "0px solid rgba(0, 0, 0, 0.125)",
        borderRadius: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
        userSelect: "none",
        ...sx,
      }}
    >
      <GenBox
        className="GenCard-container"
        sx={{
          padding: "16px",
          opacity: "1",
          background: "transparent",
          color: "rgb(52, 71, 103)",
        }}
      >
        {children}
      </GenBox>
    </GenBox>
  );
}
