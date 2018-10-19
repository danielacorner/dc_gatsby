import React, { Component } from "react";
import styled from "styled-components";
import Dlogo from "../images/Dlogo.png";

const Nav = styled.nav`
  width: 100%;
  height: 64px;
  z-index: 3;
  #navlogo {
    width: 32px;
    height: 32px;
    position: absolute;
    &:hover {
      #namespan1 {
        transform: translateY(0);
      }
      #namespan2 {
        transform: translateX(0);
      }
    }
    img {
      width: 32px;
      height: auto;
      margin: 0;
      display: inline-block;
      position: absolute;
      top: 10px;
      left: 10px;
    }
    span {
      transition: 0.4s cubic-bezier(1, 0.29, 0, 1.01);
      pointer-events: none;
      top: 20px;
      left: 48px;
      text-overflow: initial;
      display: inline-block;
      position: absolute;
      vertical-align: super;
      text-transform: uppercase;
      font-family: "Roboto", sans-serif;
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.7);
      letter-spacing: 2px;
    }
    #namespan1 {
      transform: translateY(-250px);
    }
    #namespan2 {
      transform: translateX(-250px);
      top: 51px;
      left: 15px;
    }
  }
  ul {
    height: 100%;
    margin: 0;
    li {
      margin: 0;
      list-style-type: none;
      a {
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        cursor: pointer;
        letter-spacing: 2px;
        color: rgba(255, 255, 255, 0.7);
        transition: 0.2s ease-in-out;
        &::after {
          transition: 0.16s cubic-bezier(0.46, -0.13, 0.79, 1.26);
          display: block;
          content: "";
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          transform: scaleX(0);
          border-bottom: 4px solid #ffca2d;
        }
        &:hover {
          color: #ffca2dcc;
          &::after {
            transform: scaleX(1);
          }
        }
      }
    }
    display: grid;
    grid-template-columns: auto auto;
    justify-content: end;
    grid-gap: 30px;
    padding-right: 40px;
    grid-auto-flow: column;
    align-items: center;
    justify-items: end;
  }
`;
export default class Navbar extends Component {
  handleClickWork = () => {
    window.scrollTo({
      top: document.querySelector(".latestWorkTitle").getBoundingClientRect()
        .top,
      behavior: "smooth",
    });
  };
  handleClickContact = () => {
    window.scrollTo({
      top: document.querySelector("#contactForm").getBoundingClientRect().top,
      behavior: "smooth",
    });
  };
  render() {
    return (
      <Nav>
        <ul>
          <li id="navlogo" style={{ justifySelf: "start" }}>
            <span id="namespan1">aniel</span>
            <span id="namespan2">Corner</span>
            <img src={Dlogo} alt="Daniel Corner" />
          </li>
          <li>
            <a onClick={this.handleClickWork}>Work</a>
          </li>
          <li>
            <a onClick={this.handleClickContact}>Contact</a>
          </li>
        </ul>
      </Nav>
    );
  }
}
