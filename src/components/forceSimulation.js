import * as d3 from "d3";

const createForceSimulation = nodes => {
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
    .style("fill", "blue")
    .merge(u)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  u.exit().remove();
}
export default createForceSimulation;
