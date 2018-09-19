import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import ForceSimulation from "../components/ForceSimulation";

const HeroAndSim = styled.header`
  background: rgba(0, 0, 0, 0.1);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-gap: 10px;

  &.initialLayout {
    grid-template-areas: "hero";
    grid-template-columns: 100vw;
    grid-template-rows: 100vh auto;
  }
  &.finalLayout {
    grid-template-areas: "d3sim" "hero";
    grid-template-columns: 100vw;
  }
`;

const HeroDiv = styled.div`
  transition: all 0.7s ease-out;

  height: 100%;
  display: grid;

  transform: scale(1);
  place-items: center center;
  padding: 19% 0;

  &.initialLayout {
    grid-template-rows: 300px 2fr;
    div {
      margin: auto;
      width: 70%;
      max-width: 700px;
    }
  }
  img {
    width: 70%;
    height: auto;
    max-width: 300px;
    border-radius: 100%;
    margin: 0;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
      0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);
    animation: transitionUp 1s, fadeIn 1s;
  }
  h1 {
    color: #ffca2d;
    margin-bottom: 0;
    font-family: "Oxygen Mono", monospace;
  }
  p {
    color: #a6cfd5;
    font-size: 20px;
    /* max-width: 40vw; */
  }
  .introText {
    position: relative;
  }
  .title {
    position: relative;
    display: grid;
    place-items: center center;
    h1 {
      overflow: hidden;
      left: 0;
      background: rgb(0, 0, 0, 0.2);
      .blink {
        display: inline;
        animation: blink 0.85s cubic-bezier(1, 0, 0, 1) infinite;
      }
    }
  }

  @media (max-width: 700px) {
  }
`;
const HeroImg = styled.img``;

const D3Sim = styled.section`
  background: var(--black);
  grid-area: d3sim;
  display: grid;
  p {
    background: #bada55;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
const styles = {};
class Header extends Component {
  render() {
    const { classes, scrolled, nodes } = this.props;
    return (
      <HeroAndSim className={!scrolled ? "initialLayout" : "finalLayout"}>
        {/* contains: hero, d3sim */}
        {/* hero */}
        <HeroDiv className={`${!scrolled ? "initialLayout" : "finalLayout"}`}>
          <HeroImg src="https://image.ibb.co/g6KUSK/headshot.jpg" />
          <div className="introText">
            <div className="title">
              <h1>
                Hello world..
                <span className="blink">.</span>
              </h1>
            </div>
            <p style={{ marginTop: 20 }}>
              I'm a Junior Front-end Engineer looking to get started in the
              industry. My background is in engineering (chemical and biotech)
              -- I like to make things work.
            </p>
            <p>
              I discovered my passion for web development during a data-driven
              design competition, and I've been self-teaching ever since.
            </p>
          </div>
        </HeroDiv>
        {/* simulation */}
        <D3Sim>
          <svg className="canvas">
            {scrolled && (
              <ForceSimulation scrolled={scrolled} graph={{ nodes: nodes }} />
            )}
          </svg>
          <p>
            Todo: hover the circles to highlight the sidebar, and vice versa
          </p>
        </D3Sim>
      </HeroAndSim>
    );
  }
}
export default withStyles(styles)(Header);
