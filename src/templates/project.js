import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { navigateTo } from "gatsby-link";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ArrowBack";

const ProjectPage = styled.main`
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
  /* place-items: center center; */
`;

const HeroImg = styled.img`
  width: 95%;
  /* position: absolute; */
  margin-top: 2.5vw;
  justify-self: center;
`;

export default function Template({ data }) {
  const { markdownRemark: project } = data;
  // const project = data.markdownRemark;
  return (
    <ProjectPage>
      <HeroImg src={project.frontmatter.image} />
      <h1>{project.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: project.html }} />
      <ul>
        {project.frontmatter.tools.map(tool => (
          <li>{tool}</li>
        ))}
      </ul>
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
