import React, { Component } from "react";
import ForceSimulation from "./ForceSimulation";
import styled from "styled-components";

const D3Sim = styled.section`
  height: 100vh;
  width: 100vw;

  background: white;
  display: grid;
  svg {
    width: 100%;
    height: 100vh;
  }
`;

export default class D3Wrapper extends Component {
  render() {
    const { popup, nodes } = this.props;
    return (
      <D3Sim>
        {/* simulation */}
        <svg className="canvas">
          {popup && <ForceSimulation popup={popup} graph={{ nodes: nodes }} />}
        </svg>
        <p>Todo: hover the circles to highlight the sidebar, and vice versa</p>
      </D3Sim>
    );
  }
}
