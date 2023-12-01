import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GenBox } from "../components";

type LinePlotProps = {
  data: number[];
  height: number;
  strokeWidth: number;
  strokeColor: string;
};

const LinePlot: React.FC<LinePlotProps> = ({ data, height, strokeWidth, strokeColor }) => {
  const d3Container = useRef(null);
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(800);

  useEffect(() => {
    if (ref && ref.current) {
    // when the component gets mounted
      setWidth(ref?.current?.offsetWidth);
    }
    // setHeight(ref.current?.offsetHeight);
    // to handle page resize
    const getwidth = () => {
      if (ref && ref.current) {
      setWidth(ref?.current?.offsetWidth);
      //   setHeight(ref.current?.offsetHeight);
      console.log("width: " + ref.current?.offsetWidth);
      //   console.log("height: " + ref.current?.offsetHeight);
      }
    };
    window.addEventListener("resize", getwidth);
    // remove the event listener before the component gets unmounted
    return () => window.removeEventListener("resize", getwidth);
  }, [ref, ref.current]);

  useEffect(() => {
    if (data && d3Container.current) {
      const margin = { top: 10, right: 12, bottom: 12, left: 25 };

      // Adjusted dimensions for inner drawing area
      const drawingWidth = width - margin.left - margin.right;
      const drawingHeight = height - margin.top - margin.bottom;

      const svg = d3
        .select(d3Container.current)
        .html("") // Clear svg content
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Scales
      const x = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, drawingWidth]);

      const y = d3
        .scaleLinear()
        .domain([d3.min(data) ?? 0, // If d3.min(data) is undefined, use 0
          d3.max(data) ?? 1  // If d3.max(data) is undefined, use 1
        ])
        .range([drawingHeight, 0]);

      // Axes
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append("g").call(d3.axisLeft(y));

      // Axes labels
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.bottom - 5);

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top);

      // Line generator
      const line = d3
        .line<number>()
        .x((d: any, i: any) => x(i))
        .y((d: any) => y(d));

      // Draw the line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr("d", line);
    }
  }, [data, height, width]);

  return (
    <GenBox
      ref={ref}
      sx={{
        maxHeight: {
          xs: "80%",
          sm: "60%",
          md: "40%",
          lg: "30%",
        },
        width: "100%",
      }}
    >
      <svg
        className="d3-component"
        // style={{ height: "100%", width: "100%" }}
        height={height}
        width={width}
        ref={d3Container}
      />
    </GenBox>
  );
};

export default LinePlot;
