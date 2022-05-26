import * as d3 from "d3";

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

svg.append("text").attr("x", 5).attr("y", 70).text("Hello d3js");

svg.append("circle").attr("r", 20).attr("cx", 30).attr("cy", 20);
