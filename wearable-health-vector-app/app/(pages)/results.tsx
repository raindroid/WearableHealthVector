import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import * as d3 from "d3";
import { GenBox } from "../components";
import LinePlot from "./linePlot";

type ResultProps = {
  results: any;
};

const itemsPerPage = 1;
const beatNames = [
  "1. Regular beat",
  "2. Supraventricular premature beat",
  "3. Premature ventricular contraction",
  "4. Fusion of ventricular and regular beat",
  "5. Unclassifiable beat",
];

export default function ResultsComponent({ results }: ResultProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [maxBeats, setMaxBeats] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    setMaxPages(results?.ecg_names?.length || 0);
  }, [results]);

  useEffect(() => {
    setMaxBeats(results?.ecg_beats[currentPage]?.length || 0);
    setCurrentBeat(0);
  }, [currentPage, results?.ecg_beats]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev < maxPages - 1 ? prev + 1 : 0));
  };

  const handleBack = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : maxPages - 1));
  };

  const handleNextBeat = () => {
    setCurrentBeat((prev) => (prev < maxBeats - 1 ? prev + 1 : 0));
  };

  const handleBackBeat = () => {
    setCurrentBeat((prev) => (prev > 0 ? prev - 1 : maxBeats - 1));
  };

  // Rest of the component...
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1280px",
      }}
    >
      <Card
        key={currentPage}
        sx={{
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            width: "100%",
          }}
        >
          <Typography variant="h5">{results.ecg_names[currentPage]}</Typography>

          <LinePlot
            data={results.ecg_beats[currentPage][currentBeat]}
            height={matches ? 400 : 160}
            strokeColor="blue"
            strokeWidth={matches ? 2 : 1}
          />
          <Typography variant="subtitle1">
            Top 1 Result:{" "}
            {beatNames[Number(results.top_1[currentPage][currentBeat])]}
          </Typography>
          <Typography variant="subtitle1">
            Top 5 Result:{" "}
            {beatNames[Number(results.top_5[currentPage][currentBeat])]}
          </Typography>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button size="small" color="info" onClick={handleBackBeat}>
              Previous Beat
            </Button>
            <Typography variant="subtitle2">
              Beat {currentBeat + 1} of {maxBeats}
            </Typography>
            <Button size="small" color="info" onClick={handleNextBeat}>
              Next Beat
            </Button>
          </CardActions>
          {results.results[currentPage][currentBeat].map(
            (result: any, index: number) => (
              <>
                <Divider />
                <Typography variant="subtitle2">
                  Rank {index + 1} Distance Score: {result.score}
                  <br />
                  Result:{" "}
                  {beatNames[Number(results.top_1[currentPage][currentBeat])]}
                </Typography>
                <LinePlot
                  key={index}
                  data={result.values}
                  height={matches ? 300 : 160}
                  strokeColor="purple"
                  strokeWidth={matches ? 2 : 1}
                />
              </>
            )
          )}
        </CardContent>
      </Card>
      <GenBox
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button onClick={handleBack}>Back</Button>
        <Typography variant="subtitle2">
          ECG {currentPage + 1} of {maxPages}
        </Typography>
        <Button onClick={handleNext}>Next</Button>
      </GenBox>
    </div>
  );
}
