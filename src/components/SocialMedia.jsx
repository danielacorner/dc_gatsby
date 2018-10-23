import React, { Component } from "react";
import styled from "styled-components";
import githubLogo from "../images/logos/github.svg";
const InlineButtons = styled.div`
  height: 56px;
  a {
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
      transform: translateY(-2px) scale(1.1);
      img,
      div {
        border-radius: 100%;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.6);
      }
    }
  }
  img,
  .st-btn {
    margin: 0;
    height: 32px;
  }
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-items: center;
  grid-gap: 42px;
  .st-btn {
    display: inline-block;
    background: slategrey;
    width: 32px;
    border-radius: 100%;
    display: grid;
    place-items: center center;
  }
  justify-content: center;
`;
export default class SocialMedia extends Component {
  render() {
    return (
      <InlineButtons>
        <a href="mailto:danielcorner7@gmail.com">
          <div className="st-btn" data-network="email">
            <svg
              fill="#fff"
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              viewBox="0 0 40 40"
            >
              <g>
                <path d="m33.4 13.4v-3.4l-13.4 8.4-13.4-8.4v3.4l13.4 8.2z m0-6.8q1.3 0 2.3 1.1t0.9 2.3v20q0 1.3-0.9 2.3t-2.3 1.1h-26.8q-1.3 0-2.3-1.1t-0.9-2.3v-20q0-1.3 0.9-2.3t2.3-1.1h26.8z" />
              </g>
            </svg>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/daniel-corner-16a3835b/">
          <img
            src="https://s18955.pcdn.co/wp-content/uploads/2017/05/LinkedIn.png"
            alt="LinkedIn Button"
          />
        </a>
        <a href="https://github.com/dcorn068">
          <img
            style={{
              transform: "scale(1.03)",
              borderRadius: "100%",
            }}
            src={githubLogo}
            alt="Github Button"
          />
        </a>
        <a href="https://twitter.com/dcorn068">
          <img
            src="https://s18955.pcdn.co/wp-content/uploads/2017/05/Twitter.png"
            alt="Twitter Button"
          />
        </a>
      </InlineButtons>
    );
  }
}
