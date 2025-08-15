import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CyclistData {
  Time: string;
  Place: number;
  Seconds: number;
  Name: string;
  Year: number;
  Nationality: string;
  Doping: string;
  URL: string;
}

interface ScatterplotChartProps {
  data: CyclistData[];
}

export const ScatterplotChart: React.FC<ScatterplotChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 120, bottom: 60, left: 80 };
    const containerWidth = svgRef.current.clientWidth;
    const containerHeight = 600;
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    svg.attr("width", containerWidth).attr("height", containerHeight);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Convert time strings to Date objects for proper scaling
    const timeFormat = d3.timeParse("%M:%S");
    const processedData = data.map(d => ({
      ...d,
      timeDate: timeFormat(d.Time)
    }));

    // Create scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(processedData, d => d.Year) as [number, number])
      .range([0, width]);

    const yScale = d3.scaleTime()
      .domain(d3.extent(processedData, d => d.timeDate) as [Date, Date])
      .range([0, height]);

    // Create axes
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format("d"));

    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.timeFormat("%M:%S"));

    g.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#64748b");

    g.append("g")
      .attr("id", "y-axis")
      .call(yAxis)
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#64748b");

    // Add axis labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#475569")
      .text("Time in Minutes");

    g.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#475569")
      .text("Year");

    // Create tooltip
    const tooltip = d3.select("body").append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0, 0, 0, 0.9)")
      .style("color", "white")
      .style("padding", "12px")
      .style("border-radius", "6px")
      .style("font-size", "14px")
      .style("max-width", "300px")
      .style("box-shadow", "0 4px 6px rgba(0, 0, 0, 0.1)")
      .style("z-index", "1000");

    // Create dots
    g.selectAll(".dot")
      .data(processedData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.Year))
      .attr("cy", d => yScale(d.timeDate))
      .attr("r", 6)
      .attr("data-xvalue", d => d.Year)
      .attr("data-yvalue", d => d.timeDate?.toISOString())
      .style("fill", d => d.Doping ? "#f97316" : "#22c55e")
      .style("stroke", "#fff")
      .style("stroke-width", 2)
      .style("opacity", 0.8)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .style("opacity", 1);

        tooltip
          .style("visibility", "visible")
          .attr("data-year", d.Year)
          .html(`
            <div style="font-weight: bold; margin-bottom: 8px;">${d.Name}: ${d.Nationality}</div>
            <div style="margin-bottom: 4px;">Year: ${d.Year}, Time: ${d.Time}</div>
            <div style="margin-bottom: 8px;">Rank: ${d.Place}</div>
            ${d.Doping ? `<div style="color: #fbbf24; line-height: 1.4;">${d.Doping}</div>` : '<div style="color: #86efac;">No doping allegations</div>'}
          `);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 6)
          .style("opacity", 0.8);

        tooltip.style("visibility", "hidden");
      });

    // Create legend
    const legend = g.append("g")
      .attr("id", "legend")
      .attr("transform", `translate(${width + 20}, ${height / 2 - 30})`);

    const legendData = [
      { color: "#22c55e", text: "No doping allegations" },
      { color: "#f97316", text: "Riders with doping allegations" }
    ];

    const legendItems = legend.selectAll(".legend-item")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 25})`);

    legendItems.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", d => d.color)
      .style("stroke", "#fff")
      .style("stroke-width", 1);

    legendItems.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .style("font-size", "14px")
      .style("fill", "#475569")
      .text(d => d.text);

    // Cleanup function to remove tooltip on component unmount
    return () => {
      d3.select("#tooltip").remove();
    };
  }, [data]);

  return (
    <div className="w-full">
      <svg
        ref={svgRef}
        className="w-full h-auto"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
};