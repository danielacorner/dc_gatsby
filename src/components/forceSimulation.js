import * as d3 from "d3";

const createForceSimulation = nodes => {
  const defs = d3.select(".canvas").append("defs");
  defs
    .selectAll("pattern")
    .data(nodes)
    .enter()
    .append("pattern")
    // .attr("id", d => "pattern_1")
    .attr("id", d => "pattern_" + d.id)
    .attr("patternUnits", "objectBoundingBox")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("svg:image")
    .attr("xlink:href", d => d.imgThumb)
    // .attr("xlink:href", "https://thumb.ibb.co/gC7HX9/art_2.jpg")
    .attr("width", d => d.radius * 2)
    .attr("height", d => d.radius * 2)
    .attr("preserveAspectRatio", "none")
    .attr("x", 0)
    .attr("y", 0);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", () => ticked(nodes));
};

function ticked(nodes) {
  let u = d3
    .select(".canvas")
    .selectAll("circle")
    .data(nodes);

  u.enter()
    .append("circle")
    .attr("r", d => d.radius + "px")
    // .style("fill", "blue")
    // .attr("fill", d => `url(#pattern_1)`)
    .attr("fill", d => `url(#pattern_${d.id})`)
    .style("stroke", "black")
    // .style("stroke-width", 1)
    .merge(u)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  u.exit().remove();
}
export default createForceSimulation;
