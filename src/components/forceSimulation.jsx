import * as d3 from "d3";
import React, { Component } from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class ForceSimulation extends Component {
  render() {
    return null;
  }
  componentDidMount() {
    const { nodes } = this.props;
    console.log("nodes", nodes);
    //todo: links

    // svg images
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

    // tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const canvas = document.querySelector(".canvas").getBoundingClientRect();
    const width = canvas.width;
    const height = canvas.height;

    // draw nodes
    const circles = d3
      .select(".canvas")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("id", d => "circle_" + d.id)
      .attr("r", d => d.radius + "px")
      // .style("fill", "blue")
      // .attr("fill", d => `url(#pattern_1)`)
      .attr("fill", d => `url(#pattern_${d.id})`)
      .style("stroke", "black")
      .on("mouseover", d => {
        const circle = d3.select(`#circle_${d.id}`);

        circle.style("stroke-width", 2);

        tooltip.style("opacity", 1).html(
          `
        <article>
        <h6>${d.title}</h6>
        <p desc>${d.desc}</p>
        <p caption>${d.caption}</p>
        <p tools>${d.tools}</p>
        </article>
        `
        );
      })
      .on("mouseout", d => {
        const circle = d3.select(`#circle_${d.id}`);

        tooltip.style("opacity", 0);

        circle.style("stroke-width", 1);
      })
      .on("mousemove", () => {
        tooltip
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + 10 + "px");
      });
    // .style("stroke-width", 1)

    const NODE_PADDING = 4;

    const simulation = d3
      .forceSimulation(nodes)
      .velocityDecay(0.2) // use for faster dev testing
      .force("collide", d3.forceCollide().radius(d => d.radius * 1.04))
      .force("charge", d3.forceManyBody().strength(d => -d.radius))
      .force("x", d3.forceX().strength(0.3))
      .force("y", d3.forceY().strength(0.3))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {
        circles.attr("cx", d => d.x).attr("cy", d => d.y);
      });

    // add dragging behavior to nodes
    applyDragBehaviour(circles);

    function applyDragBehaviour(node) {
      node.call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );
    }
    function dragstarted(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
  }
}
