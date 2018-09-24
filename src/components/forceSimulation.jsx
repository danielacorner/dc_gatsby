import * as d3 from "d3";
import React, { Component } from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class ForceSimulation extends Component {
  render() {
    return null;
  }
  componentDidMount() {
    const { graph, onNodeClick } = this.props;

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const canvas = document.querySelector(".canvas").getBoundingClientRect();

    const node = d3.select(".canvas").selectAll(".node");

    // scale radius from 1-10
    graph.nodes = graph.nodes.map(d => {
      d.radius = Math.pow(d.radius, 0.65) * 18;
      return d;
    });

    const defs = d3
      .select(".canvas")
      .append("defs")
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
      // .attr("width", d => d.radius * 2)
      .attr("height", d => d.radius * 2)
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("x", 0)
      .attr("y", 0);

    const numProjects = d3.max(graph.nodes.map(d => d.id));

    // fix starting positions
    graph.nodes = graph.nodes.map(d => {
      d.fx = (Math.random() - 0.5) * canvas.width * 0.6;
      // highest ID goes to top // 8 => -0.5, 1 => 0.5
      d.fy = (0.5 - (d.id - 1) / (numProjects - 1)) * canvas.height * 0.8;
      return d;
    });

    // draw nodes
    let circles = d3
      .select(".canvas")
      .selectAll("circle")
      // fix the initial positions of the nodes
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("id", d => "circle_" + d.id)
      .attr("r", "0px")
      .style(
        "cursor",
        "url('http://www.rw-designer.com/cursor-view/54513.png'), pointer"
      )
      .attr("fill", d => `url(#pattern_${d.id})`)
      .attr("class", "projectCircle")
      .style(
        "transform",
        `translate(${canvas.width / 2}px, ${canvas.height / 2}px)`
      )
      .on("mouseover", function(d) {
        // remove all glows
        document.querySelectorAll(".glow").forEach(item => {
          Array.from(item.classList).includes("glow") &&
            item.classList.remove("glow");
        });
        d3.selectAll(".projectCircle").style("filter", null);
        // add glow on mouseover
        d3.select(this).style("filter", "url(#glow)");
        // bug: this doesn't work...
        // yellow glow
        // document.getElementById(`circle_${d.id}`) &&
        //   // (!Array.from(
        //   //   document.getElementById(`circle_${d.id}`).classList
        //   // ).includes("glow") &&
        //   document.getElementById(`circle_${d.id}`).classList.add("glow");
        // );
        document.getElementById(`listItem_${d.id}`) &&
          // (!Array.from(
          //   document.getElementById(`listItem_${d.id}`).classList
          // ).includes("glow") &&
          document.getElementById(`listItem_${d.id}`).classList.add("glow");
        // );
      })
      .on("mouseout", d => {
        // remove all glows
        document.querySelectorAll(".glow").forEach(item => {
          Array.from(item.classList).includes("glow") &&
            item.classList.remove("glow");
        });
      });

    // transition in circles, then animate links
    circles
      .transition()
      .delay(d => d.id * 75)
      .duration(500)
      .attr("r", d => d.radius + "px")
      .on("end", d => {
        if (d.id === numProjects) {
          startNextLine(1);
        }
      });

    const findRelatedNode = (id, relation) =>
      graph.nodes.find(
        node => parseInt(id) === parseInt(node.id) + parseInt(relation)
      );

    graph.links = graph.nodes.map(n => {
      return {
        target: findRelatedNode(n.id, 0) ? findRelatedNode(n.id, 0) : null,
        source: findRelatedNode(n.id, 1) ? findRelatedNode(n.id, 1) : null,
      };
    });
    // .slice(1);

    const links = d3
      .select(".canvas")
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("id", d => `link_${d.target.id - 1}`)
      .style(
        "transform",
        `translate(${canvas.width / 2}px, ${canvas.height / 2}px)`
      );

    // connect the dots
    links.each(link => {
      document
        .getElementById(`link_${link.target.id - 1}`)
        .addEventListener("animationend", () => {
          startNextLine(+link.target.id);
        });
    });
    function startNextLine(id) {
      document.getElementById(`link_${id}`) &&
        document.getElementById(`link_${id}`).classList.add("linkAppear");
    }

    // redraw the nodes over the links with a "use" element
    d3.select(".canvas")
      .selectAll("use")
      .data(graph.nodes)
      .enter()
      .append("use")
      .attr("xlink:href", d => `#circle_${d.id}`);

    function updateLinks() {
      links
        .attr("x1", d => (d.source ? d.source.x : null))
        .attr("y1", d => (d.source ? d.source.y : null))
        .attr("x2", d => (d.target ? d.target.x : null))
        .attr("y2", d => (d.target ? d.target.y : null));
    }
    function updateNodes() {
      circles.attr("cx", d => d.x).attr("cy", d => d.y);
    }

    const NODE_PADDING = 4;
    const FORCE_MULTIPLIER = 1;

    d3.forceSimulation(graph.nodes);

    setTimeout(() => {
      const simulation = d3
        .forceSimulation(
          graph.nodes.map(d => {
            d.fx = null;
            d.fy = null;
            return d;
          })
        )
        .velocityDecay(0.75)
        .alphaTarget(0)
        .force("collide", d3.forceCollide().radius(d => d.radius * 1.04))
        .force("link", d3.forceLink(links).distance(200))
        .force("x", d3.forceX().strength(0.0045 * FORCE_MULTIPLIER))
        .force("y", d3.forceY().strength(0.003 * FORCE_MULTIPLIER))
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
        onNodeClick(d.id);

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
    }, 100);
  }
}
