"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  ButtonProps,
  CircularProgress,
  LinearProgress,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import { Nova_Square, Saira } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { GenBox } from "../components";

const noveSquare = Nova_Square({ subsets: ["latin"], weight: "400" });
const saira = Saira({ subsets: ["latin"], weight: "900" });

import ResultsComponent from "./results";

const UploadButton = styled(Button)<ButtonProps>({
  // backgroundColor: "#1976d2", // Customize button color here
  padding: "10px 20px",
  fontSize: "1.25rem", // Larger font size for the button
  "&:hover": {
    backgroundColor: "#5122a3",
  },
  borderRadius: "100rem",
  width: "15rem",
  height: "3rem",
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Home() {
  const searchParams = useSearchParams();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<null | string | any>(null);
  const [error, setError] = useState<null | string>(null);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setError(null);

    try {
      const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL?.toString() || "";
      console.log(`Uploading to ${uploadUrl}`);
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      const data = response.data;
      if (data.status !== "success") {
        setError(data.status);
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <GenBox
      sx={{
        width: "100%",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {result ? (
        <GenBox
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "fit-content",
            textAlign: "center",
            alignItems: "center",
            width: "100%",
            top: 0,
          }}
        >
          <UploadButton
            variant="contained"
            component="label"
            sx={{
              fontSize: "1rem",
              height: "2rem",
              width: "14rem",
              marginBottom: "2rem",
            }}
            startIcon={<CloudUploadIcon />}
          >
            Upload New
            {uploading ? <CircularProgress variant="determinate" /> : <></>}
            <VisuallyHiddenInput
              type="file"
              onChange={handleUpload}
              accept=".zip"
            />
          </UploadButton>
          <ResultsComponent results={result} />
        </GenBox>
      ) : (
        <GenBox
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            position: "absolute",
            top: 0,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "start",
              marginBottom: "1rem",
            }}
          >
            We use ECG data collected from Apple Watch
            <br />
            1. In Apple Health on your iPhone, click profile icon <br/>
            2. Scroll down to the end <br />
            3. Click <strong>Export All Health Data</strong> button <br/>
            4. Save the{" "}<strong>export.zip</strong>, and upload it here
          </Typography>
          <UploadButton
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload
            {uploading ? <CircularProgress variant="determinate" /> : <></>}
            <VisuallyHiddenInput
              type="file"
              onChange={handleUpload}
              accept=".zip"
            />
          </UploadButton>

          <Typography
            variant="h5"
            className={noveSquare.className}
            sx={{
              mt: 2,
              fontWeight: 900,
              fontSize: "2rem",
            }}
          >
            The Future of Personalized Health:
            <br />
            <div className={saira.className}>
              Affordable, Data-Driven Monitoring
            </div>
            Right on Your Wrist
          </Typography>
          {uploading ? (
            <LinearProgress /> // Show loading indicator
          ) : null}
        </GenBox>
      )}
    </GenBox>
  );
}
