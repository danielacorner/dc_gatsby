import React, { Component } from "react";
import ForceSimulation from "./ForceSimulation";
import styled from "styled-components";

const D3Sim = styled.section`
  width: 100%;
  height: 200vh;
  width: calc(100vw-255px);

  display: grid;
  grid-template-rows: 30vh 1fr;

  justify-items: center;
  h2 {
    margin: 0 auto;
    padding: 20px;
    color: #ffca2d;
    font-family: "Oxygen Mono", monospace;
    align-self: end;
    opacity: 0;
    &.simStart {
      animation: transitionUp 0.5s, fadeIn 0.5s;
      opacity: 1;
    }
  }

  svg.canvas {
    /* background: #eaeaea1f; */
    height: 100vh;
    max-height: 1200px;
    width: 100%;
    max-width: 900px;
  }
`;

export default class D3Wrapper extends Component {
  render() {
    const { simStart, popup, nodes, onNodeClick } = this.props;
    return (
      <D3Sim>
        <h2 className="latestWorkTitle">Some of my latest work...</h2>
        {/* simulation */}
        <svg className="canvas">
          {/* <!-- a transparent glow that takes on the colour of the object it's applied to --> */}
          <filter id="glow">
            <feColorMatrix
              type="matrix"
              values="1     0     0     0     0
              0     0.79     0     0     0
              0     0     0.18     0     0
              0     0     0     0.9     0 "
            />
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {simStart && (
            <ForceSimulation
              onNodeClick={id => onNodeClick(id)}
              graph={{ nodes: nodes }}
            />
          )}
        </svg>
      </D3Sim>
    );
  }
}
