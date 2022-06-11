import {
  csv,
  select,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format
} from "d3";
import "./styles.css";

const svg = select("svg");

const width = Number(svg.attr("width"));
const height = Number(svg.attr("height"));
const margin = {
  top: 50,
  left: 160,
  bottom: 70,
  right: 20
};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xAxisFormattingNumber = (number) =>
  format(".3s")(number).replace("G", "B");

const render = (data) => {
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.population)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.1);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xAxis = axisBottom(xScale)
    .tickFormat(xAxisFormattingNumber)
    .tickSize(-innerHeight);

  g.append("g")
    .call(axisLeft(yScale))
    .selectAll(".domain, .tick line")
    .remove();
  const xAxisGroup = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${innerHeight})`);

  xAxisGroup.select(".domain").remove();

  xAxisGroup
    .append("text")
    .text("Population")
    .attr("fill", "black")
    .attr("y", 60)
    .attr("x", innerWidth / 2);

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d.country))
    .attr("width", (d) => xScale(d.population))
    .attr("height", (d) => yScale.bandwidth())
    .attr("fill", "steelblue");

  g.append("text")
    .text("Top 10 most populous countries in the world")
    .attr("y", -10);
};

csv("src/data.csv").then((data) => {
  const countryData = data.map((country) => ({
    ...country,
    population: Number(country.population) * 1000
  }));

  countryData.sort(function (a, b) {
    return b.population - a.population;
  });
  console.log(countryData);
  render(countryData);
});
