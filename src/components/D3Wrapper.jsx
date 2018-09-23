import React, { Component } from "react";
import ForceSimulation from "./ForceSimulation";
import styled from "styled-components";

const D3Sim = styled.section`
  margin-top: 10vh;
  display: grid;
  grid-template-rows: 1fr;
  width: 100%;
  height: 200vh;
  width: calc(100vw-255px);

  justify-items: center;

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
