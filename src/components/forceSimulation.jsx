import * as d3 from "d3";
import React, { Component } from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class ForceSimulation extends Component {
  render() {
    return null;
  }
  componentDidMount() {
    const { graph } = this.props;
    //todo: links
    // var g = svg.append("g")
    // //.attr("transform", "translate(" + width / 2 + "," + height/ 2 + ")")
    // link = g.append("g").selectAll(".link"),
    // //Draw links colored by T
    // //   link = g.selectAll('.link')
    // link.data(currLinks)
    //   .enter().append('path')
    //   .attr('stroke', function (d) { return color(d.T); });

    // //Add mouseover events to links
    // link.attr('class', 'link')
    //   .on('mouseover.fade', linkFade(0.1))
    //   .on('mouseover.tooltip', function (d) {
    //     tooltip.transition()
    //       .duration(300)
    //       .style("opacity", .8);
    //     tooltip.html("Source:" + d.source.id +
    //       "<p/>Target:" + d.target.id +
    //       "<p/>T:" + d.T)
    //       .style("left", (d3.event.pageX) + "px")
    //       .style("top", (d3.event.pageY + 10) + "px");
    //   })
    //   .on("mouseout.tooltip", function () {
    //     tooltip.transition()
    //       .duration(100)
    //       .style("opacity", 0);
    //   })
    //   .on('mouseout.fade', linkFade(1))
    //   .on("mousemove", function () {
    //     tooltip.style("left", (d3.event.pageX) + "px")
    //       .style("top", (d3.event.pageY + 10) + "px");
    //   });

    // .force("link", d3.forceLink(currLinks).distance(200))

    // svg images
    const defs = d3.select(".canvas").append("defs");
    defs
      .selectAll("pattern")
      .data(graph.nodes)
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

    const svg = d3.select(".canvas");
    const node = svg.selectAll(".node");

    // draw nodes
    let circles = svg
      .selectAll("circle")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("id", d => "circle_" + d.id)
      .attr("r", d => d.radius + "px")
      .attr("fill", d => `url(#pattern_${d.id})`)
      .style("stroke", "black")
      .style("transform", `translate(${width / 2}px, ${height / 2}px)`)
      .on("mouseover", d => {
        d3.select(`#circle_${d.id}`).style("stroke-width", 2);
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
        d3.select(`#circle_${d.id}`).style("stroke-width", 1);
        tooltip.style("opacity", 0);
      })
      .on("mousemove", () => {
        tooltip
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + 10 + "px");
      });

    const findRelatedNode = (id, relation) =>
      graph.nodes.find(
        node => parseInt(id) === parseInt(node.id) + parseInt(relation)
      );

    const deepClone = d => JSON.parse(JSON.stringify(d));

    graph.links = graph.nodes.map(n => {
      return {
        source: findRelatedNode(n.id, 0) ? findRelatedNode(n.id, 0) : null,
        target: findRelatedNode(n.id, 1) ? findRelatedNode(n.id, 1) : null,
        year: n.year,
      };
    });
    console.log("nodes", graph.nodes);
    console.log("links", graph.links);

    const links = svg
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("transform", `translate(${width / 2}px, ${height / 2}px)`);

    function updateLinks() {
      links
        .attr("x1", d => (d.target ? d.source.x : null))
        .attr("y1", d => (d.target ? d.source.y : null))
        .attr("x2", d => (d.target ? d.target.x : null))
        .attr("y2", d => (d.target ? d.target.y : null));
    }
    function updateNodes() {
      circles.attr("cx", d => d.x).attr("cy", d => d.y);
    }

    const NODE_PADDING = 4;
    const FORCE_MULTIPLIER = 3;

    const simulation = d3
      .forceSimulation(graph.nodes)
      .velocityDecay(0.2) // use for faster dev testing
      .force("collide", d3.forceCollide().radius(d => d.radius * 1.04))
      .force(
        "charge",
        d3.forceManyBody().strength(d => -d.radius * 2.08 * FORCE_MULTIPLIER)
      )
      // .force( "link", d3 .forceLink(links) .id(d => d.id) .strength(d => d.radius * 10000) )
      .force("x", d3.forceX().strength(0.03 * FORCE_MULTIPLIER))
      .force("y", d3.forceY().strength(0.03 * FORCE_MULTIPLIER))
      // .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {
        updateNodes();
        updateLinks();
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
