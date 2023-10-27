import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { data } from "../constants/data";

import "../styles/Heatmap.css";

const Heatmap = () => {
  const svgRef = useRef();
  const tooltipRef = useRef(null);

  useEffect(() => {
    const margin = { top: 80, right: 20, bottom: 60, left: 20 };
    const width = 1500 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.year))
      .padding(0.1);

    const y = d3
      .scaleBand()
      .range([height, 0])
      .domain(["Temperature"])
      .padding(0.1);

    const colorRange = d3.interpolateOrRd;
    const myColor = d3
      .scaleSequential(colorRange)
      .domain([
        d3.min(data, (d) => d.temperature),
        d3.max(data, (d) => d.temperature),
      ]);

    const mouseover = function (event, d) {
      d3.select(this).style("stroke", "black").style("opacity", 1);

      tooltipRef.current.innerHTML = `Ano referente: ${d.year}<br>Aumento de temperatura: +${d.temperature}°C`;
      tooltipRef.current.style.opacity = 1;
    };

    const mouseleave = function () {
      d3.select(this).style("stroke", "none").style("opacity", 0.8);

      tooltipRef.current.style.opacity = 0;
    };

    svg
      .selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.year))
      .attr("y", y("Temperature"))
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => myColor(d.temperature))
      .style("stroke-width", 2)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave);

    // Adicione a legenda de degradê de cores
    const legend = d3
      .select(svgRef.current)
      .append("g")
      .attr("transform", "translate(200, 50)");

    const numColors = 10;
    const legendWidth = 100;
    const legendHeight = 20;
    const colorStep =
      (d3.max(data, (d) => d.temperature) -
        d3.min(data, (d) => d.temperature)) /
      numColors;

    for (let i = 0; i < numColors; i++) {
      legend
        .append("rect")
        .attr("x", i * legendWidth)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", colorRange(i / (numColors - 1)));
      legend
        .append("text")
        .attr("class", "legend__text")
        .attr("x", i * legendWidth + legendWidth / 2)
        .attr("y", legendHeight + 15)
        .style("text-anchor", "middle")
        .text((d3.min(data, (d) => d.temperature) + i * colorStep).toFixed(2));
    }
  }, []);

  return (
    <div className="container">
      <h1 className="title">Heatmap das Mudanças Climáticas (1950-2023): Uma Visualização do Aquecimento Global</h1>
      <div className="graph">
        <div className="label-y">Temperatura</div>
        <svg ref={svgRef}></svg>
      </div>
      <div className="label-x">Ano</div>
      <div ref={tooltipRef} className="tooltip"></div>
    </div>
  );
};

export default Heatmap;
