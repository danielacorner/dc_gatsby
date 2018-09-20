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
    transition: all 0.5s;
    &.simStart {
      opacity: 1;
    }
  }

  svg {
    background: #eaeaea1f;
    height: 110vh;
    max-height: 1200px;
    width: 100%;
    min-width: 400px;
  }
`;

export default class D3Wrapper extends Component {
  render() {
    const { simStart, popup, nodes } = this.props;
    return (
      <D3Sim>
        <h2 className="latestWorkTitle">Some of my latest work</h2>
        {/* simulation */}
        <svg className="canvas">
          {simStart && <ForceSimulation graph={{ nodes: nodes }} />}
        </svg>
      </D3Sim>
    );
  }
}
