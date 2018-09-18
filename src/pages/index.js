import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import ForceSimulation from "../components/ForceSimulation";
// import Paper from "@material-ui/core/Paper";
import ProjectsList from "../components/ProjectsList";
import Projects from "../components/Projects";

const Portfolio = styled.div``;
const Intro = styled.header`
  --black: #272727;
  background: aliceblue;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: auto repeat(3, 1fr);
  grid-template-columns: 1fr repeat(3, 25%);
  grid-template-areas:
    "side side side side"
    "main main main main"
    "main main main main"
    "main main main main";
  @media (min-width: 700px) {
    grid-template-areas:
      "side main main main"
      "side main main main"
      "side main main main"
      "side main main main";
  }

  aside {
    grid-area: side;
  }
`;
const D3Sim = styled.section`
  background: var(--black);

  grid-area: main;

  display: grid;
  grid-template-rows: repeat(3, 25%) 1fr;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "canv canv canv canv"
    "canv canv canv canv"
    "canv canv canv canv"
    "info info info info";

  p {
    grid-area: info;
    background: #bada55;
  }
`;
const StyledSvg = styled.svg`
  grid-area: canv;
  width: 100%;
  height: 100%;
`;
const HeroDiv = styled.div`
  transition: all 1s ease-in;
  width: 100%;
  display: grid;
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
const Aside = styled.aside``;

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
        {/* header */}
        <Intro>
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
            <StyledSvg className="canvas">
              {scrolled && (
                <ForceSimulation scrolled={scrolled} graph={{ nodes: nodes }} />
              )}
            </StyledSvg>
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
        <Projects />
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
