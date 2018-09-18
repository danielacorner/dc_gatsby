import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import ForceSimulation from "../components/ForceSimulation";
// import Paper from "@material-ui/core/Paper";
import ProjectsList from "../components/ProjectsList";

const Container = styled.main`
  --black: #272727;
  background: aliceblue;
  height: 100%;
  width: 100%;
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
const MainContent = styled.section`
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
const Aside = styled.aside``;

const styles = {};

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
    const shallowClone = d => Object.assign({}, ...d);
    const newNodes = deepClone(edges.map(d => d.node.frontmatter));

    this.setState({
      nodes: newNodes,
    });

    window.addEventListener("scroll", this.handleScroll.bind(this), {
      once: true,
    });
  };

  handleScroll(e) {
    this.setState({ scrolled: true });
  }

  render() {
    const { data, classes } = this.props;
    const { scrolled, nodes } = this.state;

    const projects = data.allMarkdownRemark.edges
      .map(p => p.node)
      .sort((a, b) => a.frontmatter.year < b.frontmatter.year);

    // console.log("projects", projects);

    return (
      <Container>
        <Aside style={{ display: scrolled ? "block" : "none" }}>
          <ProjectsList projects={projects} />
        </Aside>

        <MainContent>
          <StyledSvg className="canvas">
            {/* todo: links */}
            <ForceSimulation scrolled={scrolled} graph={{ nodes: nodes }} />
          </StyledSvg>
          <p>
            This section contains a canvas on which d3 appends circles for each
            project. Hover the circles to highlight the sidebar, and vice versa
          </p>
        </MainContent>
      </Container>
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
