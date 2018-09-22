import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { navigateTo } from "gatsby-link";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ArrowBack";
import SvgIcons from "../components/SvgIcons";
import Typography from "@material-ui/core/Typography";

const ProjectPage = styled.main`
  * {
    margin-left: 5%;
    margin-right: 5%;
  }
  height: 100vh;
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
  display: grid;
  position: relative;
  grid-template-rows: auto auto auto 1fr 1fr auto;
  /* place-items: center center; */
  h1 {
    color: #ffca2d;
    font-family: "Oxygen Mono", monospace;
    font-size: 6vw;
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
  button {
    width: 90%;
    margin-bottom: 5%;
    justify-self: center;
    justify-content: center;
  }
`;

const HeroImg = styled.img`
  width: 90%;
  /* position: absolute; */
  margin-top: 5vw;
  justify-self: center;
`;

export default function Template({ data }) {
  const { markdownRemark: project } = data;
  // const project = data.markdownRemark;
  return (
    <ProjectPage>
      <HeroImg src={project.frontmatter.image} />
      <h1>{project.frontmatter.title}</h1>
      <Typography className="badges" variant="caption">
        {project.frontmatter.tools.map(tool => {
          return <SvgIcons key={tool.toString()} tool={tool} />;
        })}
      </Typography>

      <p>{project.frontmatter.desc}</p>
      {/* <div dangerouslySetInnerHTML={{ __html: project.html }} /> */}
      <div className="tools">
        <h3>Tools:</h3>
        <ul>
          {project.frontmatter.tools.map(tool => (
            <li>{tool}</li>
          ))}
        </ul>
      </div>
      <Button
        size="small"
        color="primary"
        variant="outlined"
        onClick={() => navigateTo("/")}
        role="link"
      >
        <BackIcon />
        <span>Back to Portfolio</span>
      </Button>
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
        desc
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
