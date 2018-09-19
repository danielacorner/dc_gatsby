import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";

const HeroWrapper = styled.header`
  height: 100vh;
  width: 100vw;
  background-image: url("https://image.ibb.co/eUQPcK/ep_naturalblack.png"); /* fallback */
  background-image: radial-gradient(
      circle,
      #02418980,
      #04367380,
      #052c5d80,
      #06224880,
      #06183480
    ),
    url("https://image.ibb.co/eUQPcK/ep_naturalblack.png");

  display: grid;
`;

const HeroDiv = styled.div`
  transition: all 1s ease-out;

  height: 100%;
  display: grid;

  transform: scale(1);
  place-items: center center;
  padding: 19% 0;

  grid-template-rows: 300px 1fr;
  div {
    margin: 50px auto;
    width: 70%;
    padding-left: 10px;
    max-width: 590px;
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
  p {
    color: #a6cfd5;
    font-size: 20px;
    font-family: "Roboto", sans-serif;
    /* max-width: 40vw; */
  }
  .introText {
    position: relative;
  }
  .title {
    position: relative;
    display: grid;
    place-items: center center;
    max-width: 14ch;
    white-space: nowrap;
    position: relative;
    color: #ffca2d;
    margin: 0 auto;
    font-family: "Oxygen Mono", monospace;
    overflow-wrap: initial;
    overflow: hidden;
    border-right: 0.5ch solid rgba(255, 255, 255, 0.75);
  }
  .anim-typewriter {
    animation: typewriter 1.3s steps(14) 1s 1 normal both,
      blinkTextCursor 500ms cubic-bezier(1, 0, 0, 1) infinite normal;
  }

  @media (max-width: 700px) {
  }
`;
const HeroImg = styled.img``;

const styles = {};
class Header extends Component {
  componentDidMount() {
    const title = document.querySelector(".introText");
    title.addEventListener("animationend", this.showDownArrow);
  }
  showDownArrow() {}
  render() {
    const { classes, scrolled, popup, nodes } = this.props;
    return (
      <HeroWrapper>
        {/* contains: hero, d3sim */}
        {/* hero */}
        <HeroDiv>
          <HeroImg id="avatar" src="https://image.ibb.co/g6KUSK/headshot.jpg" />
          <div className="introText">
            <h1 className="title anim-typewriter">Hello world...</h1>
            <p style={{ marginTop: 30 }}>
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
      </HeroWrapper>
    );
  }
}
export default withStyles(styles)(Header);
