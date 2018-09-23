import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";

const HeroWrapper = styled.header`
  height: 100vh;
  width: 100vw;

  display: grid;
`;

const HeroDiv = styled.div`
  overflow-x: visible;
  overflow-y: visible;
  transition: perspective 0.2s ease-in-out, transform 0.5s ease-out;
  &.scrollingUp {
    transition: perspective 0.1s ease-out, transform 0.1s ease-out;
  }
  height: 100%;
  max-height: 100vh;
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
    p#interests {
      margin-top: 3.5em;
      margin-bottom: 4.5em;
      opacity: 0;
      transition: opacity 0.2s ease-in;
      &.revealed {
        opacity: 1;
      }
    }
    ul {
      margin: 0;
      list-style-type: none;
      text-align: center;
      li {
        margin-top: 4.5em;
        opacity: 0;
        transition: opacity 0.2s ease-in;
        &.revealed {
          opacity: 1;
        }
        &:first-child {
          margin: 0 10px;
        }
      }
    }
    .listCaption {
      text-align: center;
      font-size: 15px;
      margin-bottom: 2em;
    }
  }
  .title {
    position: relative;
    display: grid;
    place-items: center center;
    max-width: 14ch;
    white-space: nowrap;
    position: relative;
    color: #ffca2d;
    font-family: "Oxygen Mono", monospace;
    margin: 0 auto;
    overflow-wrap: initial;
    overflow: hidden;
    border-right: 0.5ch solid rgba(255, 255, 255, 0.75);
    @media (max-width: 376px) {
      font-size: 28px;
    }
    @media (max-width: 330px) {
      font-size: 24px;
    }
  }
  .anim-typewriter {
    animation: typewriter 1.3s steps(14) 1s 1 normal both,
      blinkTextCursor 500ms cubic-bezier(1, 0, 0, 1) infinite normal;
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
        <HeroDiv id="hero">
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
            <p id="interests">Some of my interests:</p>
            <ul>
              <li id="interest1">
                <p>Data visualization and wrangling</p>
                <p className="listCaption">Excel | JavaScript</p>
              </li>
              <li id="interest2">
                <p>Front-end and CSS frameworks </p>
                <p className="listCaption">
                  React | Angular | Vue | Materialize | CSS Grid
                </p>
              </li>
              <li id="interest3">
                <p>Accelerated learning techniques</p>
                <p className="listCaption">MMS | mnemonics | memory palaces</p>
              </li>
            </ul>
          </div>
        </HeroDiv>
      </HeroWrapper>
    );
  }
}
export default withStyles(styles)(Header);
