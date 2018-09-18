import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import ForceSimulation from "../components/ForceSimulation";
// import Paper from "@material-ui/core/Paper";
import ProjectsList from "../components/ProjectsList";
import Project1 from "../components/Project1";

// Portfolio contains intro, aside, projects
const Portfolio = styled.div`
  --black: #272727;

  display: grid;
  grid-template-areas:
    "side intro intro intro"
    "side intro intro intro"
    "side intro intro intro"
    "side intro intro intro"
    "side proj proj proj";

  // mobile
  @media (max-width: 700px) {
    grid-template-areas:
      "side side side side"
      "intro intro intro intro"
      "intro intro intro intro"
      "intro intro intro intro"
      "proj proj proj proj";
  }
`;
// aside contains projects list
const Aside = styled.aside`
  grid-area: side;
`;
// intro contains hero, sim
const Intro = styled.header`
  grid-area: intro;
  background: aliceblue;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-gap: 10px;
  grid-template-areas: "hero" "sim";

  // mobile
  @media (max-width: 700px) {
    grid-template-areas:
      "sim"
      "hero";
  }
`;
const HeroDiv = styled.div`
  transition: all 1s ease-in;
  width: auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-areas: "hero text";
  @media (max-width: 700px) {
    grid-template-areas:
      "hero"
      "text";
  }
`;
const HeroImg = styled.img`
  border-radius: 100%;
  margin: 0;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);
  animation: transitionUp 1s, fadeIn 1s;
`;
const HeroText = styled.div``;

const D3Sim = styled.section`
  background: var(--black);

  grid-area: sim;

  display: grid;

  p {
    background: #bada55;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Projects = styled.main``;

const styles = {
  transitionUp: {
    transition: "all 1s ease-in",
  },
  initialHero: {
    transform: "scale(1)",
    position: "fixed",
    top: "40vh",
    left: "30vw",
    width: "20vw",
    minWidth: "230px",
  },
  smallHero: {},
};

// Projects Layout (below the Site Layout)

class IndexPage extends Component {
  state = {
    nodes: null,
    links: null,
    scrolled: false,
  };

  componentWillMount = () => {
    const { edges } = this.props.data.allMarkdownRemark;
    const deepClone = d => JSON.parse(JSON.stringify(d));
    // const shallowClone = d => Object.assign({}, ...d);
    const newNodes = deepClone(edges.map(d => d.node.frontmatter));

    this.setState({
      nodes: newNodes,
    });

    window.addEventListener("scroll", () => this.setState({ scrolled: true }), {
      once: true,
    });
  };
  componentDidMount = () => {};

  render() {
    const { data, classes } = this.props;
    const { scrolled, nodes } = this.state;

    const projects = data.allMarkdownRemark.edges
      .map(p => p.node)
      .sort((a, b) => a.frontmatter.year < b.frontmatter.year);

    // console.log("projects", projects);

    return (
      <Portfolio>
        {" "}
        {/* contains: intro, aside, projects */}
        {/* header */}
        <Intro>
          {" "}
          {/* contains: hero, sim */}
          {/* hero */}
          <HeroDiv
            className={`${
              !scrolled ? classes.initialHero : classes.smallHero
            } ${classes.transitionUp}`}
          >
            <HeroImg src="https://image.ibb.co/g6KUSK/headshot.jpg" />
            <HeroText>
              <h1>Hello World!</h1>
              <p>Some text over here...</p>
            </HeroText>
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
        </Intro>
        {/* projects list aside */}
        <Aside style={{ display: scrolled ? "block" : "none" }}>
          <ProjectsList projects={projects} />
        </Aside>
        {/* projects */}
        <Projects>
          <Project1 />
        </Projects>
      </Portfolio>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            id
            title
            desc
            caption
            year
            path
            radius
            tools
            image
            imgThumb
            website
          }
        }
      }
    }
  }
`;

export default withStyles(styles)(IndexPage);
