import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { navigateTo } from "gatsby-link";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ArrowBack";
import SvgIcons from "../components/SvgIcons";
import Typography from "@material-ui/core/Typography";
import OpenIcon from "@material-ui/icons/OpenInNewOutlined";

const ProjectPage = styled.main`
  * {
    margin-left: 5%;
    margin-right: 5%;
  }
  min-height: 100vh;
  height: 100%;
  background-image: url("https://image.ibb.co/eUQPcK/ep_naturalblack.png"); /* fallback */
  background-image: radial-gradient(
      circle at center 50vh,
      #02418980,
      #04367373,
      #052c5d66,
      #06224859,
      #0618344d
    ),
    url("https://image.ibb.co/eUQPcK/ep_naturalblack.png");
  /* place-items: center center; */
  .wrapper {
    animation: swooshInLeft 0.25s ease-in;
    &.unmounting {
      animation: swooshOutLeft 0.25s ease-in;
    }

    padding: 5%;
    max-width: 720px;
    margin: auto;
    display: grid;
    position: relative;
    grid-template-rows: auto auto auto 1fr;
    h1 {
      text-align: center;
      color: #ffca2d;
      font-family: "Oxygen Mono", monospace;
      font-size: 4vw;
      @media (min-width: 700px) {
        font-size: 28px;
      }
      @media (max-width: 500px) {
        font-size: 20px;
      }
      margin: auto auto 20px auto;
    }
    .badges {
      margin: 0 10%;
      display: grid;
      grid-auto-flow: column;
      justify-items: center;
      align-items: center;
    }
    p {
      margin: 18px 0;
      font-family: "Roboto", sans-serif;
      color: rgba(255, 255, 255, 0.8);
    }
    .tools {
      font-family: "Roboto", sans-serif;
      color: rgba(255, 255, 255, 0.8);
      h3 {
        margin: auto;
        font-weight: 400;
        margin-bottom: 20px;
      }
      ul {
        display: grid;
        grid-auto-flow: column;
      }
      li {
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .actionButtons {
      margin: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 3vw;
      @media (min-width: 550px) {
        grid-gap: 50px;
      }
    }
    button {
      &.visitSiteButton {
        color: lightpink;
        svg {
          margin-right: 0;
        }
      }
      &.backButton {
        text-decoration: underline;
        color: #569cd6;
        &:hover {
          background: #00008033;
        }
        svg {
          margin-left: 0;
        }
      }
      font-size: 16px;
      @media (max-width: 435px) {
        font-size: 3vw;
      }
      height: 50px;
      text-transform: none;
      margin-top: 5px;
      span {
        margin: 0;
        width: 100%;

        span {
          width: auto;
        }
      }
    }
  }
`;

const HeroImg = styled.img`
  max-height: 500px;
  /* width: auto; */
  /* position: absolute; */
  /* margin: 5vw 10vw 26px 10vw; */

  @media (min-width: 700px) {
    margin-top: 35px;
  }
  justify-self: center;
`;

export default function Template({ data }) {
  const { markdownRemark: project } = data;
  // const project = data.markdownRemark;
  return (
    <ProjectPage id="projectPage">
      <div className="wrapper">
        <HeroImg src={project.frontmatter.image} />
        <h1>{project.frontmatter.title}</h1>
        <Typography className="badges" variant="caption">
          {project.frontmatter.tools.map(tool => {
            return <SvgIcons key={tool.toString()} tool={tool} />;
          })}
        </Typography>

        <div style={{ margin: 0 }}>
          <div
            style={{ margin: 0 }}
            dangerouslySetInnerHTML={{ __html: project.html }}
          />
          <div className="actionButtons">
            <Button
              onClick={() => {
                // store previousUrl in cookie
                document.cookie = `previousUrl=${
                  window.location.href
                }; path=/;`;

                const wrapper = document.querySelector(".wrapper");

                wrapper.addEventListener("animationend", () => navigateTo("/"));

                wrapper.classList.add("unmounting");
              }}
              role="link"
              variant="outlined"
              color="primary"
              className="backButton"
            >
              <BackIcon />
              <span>Back to Portfolio</span>
            </Button>
            <Button
              className="visitSiteButton"
              color="secondary"
              variant="outlined"
              onClick={() => window.open(project.frontmatter.website, "_blank")}
            >
              <span>Visit Site</span>
              <OpenIcon />
            </Button>
          </div>
        </div>
      </div>
    </ProjectPage>
  );
}

export const projectQuery = graphql`
  query ProjectByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        id
        path
        caption
        title
        year
        radius
        tools
        image
        imgThumb
        website
      }
    }
  }
`;
