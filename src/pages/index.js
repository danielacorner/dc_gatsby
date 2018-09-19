import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import ProjectsList from "../components/ProjectsList";
import Project1 from "../components/Project1";
import Header from "../components/Header";

// Portfolio contains header, aside, projects
const Portfolio = styled.div`
  --black: #272727;
  --opac: 99;
  /* background: var(--black); */
  background-image: url("https://image.ibb.co/eUQPcK/ep_naturalblack.png"); /* fallback */
  background-image: radial-gradient(circle, #02418980, #04367380, #052c5d80, #06224880, #06183480), url("https://image.ibb.co/eUQPcK/ep_naturalblack.png");
  display: grid;

  grid-template-rows: 100vh auto auto;

  &.initialLayout {
    grid-template-columns: 1fr;
    grid-template-areas:
    "head"
    "proj";

    // mobile
    @media (max-width: 700px) {
      grid-template-areas:
      "side"
      "head"
      "proj";
      }
    }

  &.finalLayout {
    grid-template-columns: 250px 1fr;
    grid-template-areas:
    "side head"
    "side proj";

    // mobile
    @media (max-width: 700px) {
      grid-template-areas:
      "head"
      "side"
      "proj";
    }
  }
  }
`;
// aside contains projects list
const Aside = styled.aside`
  grid-area: side;

  //mobile
  @media (max-width: 700px) {
    position: sticky;
  }
`;
// intro contains hero, sim

const Projects = styled.main`
  grid-area: proj;
`;

const styles = {
  header: {
    gridArea: "head",
    width: "100%",
  },
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
      <Portfolio className={!scrolled ? "initialLayout" : "finalLayout"}>
        {/* contains: header, aside, projects */}
        {/* header */}
        <Header className={classes.header} scrolled={scrolled} nodes={nodes} />
        {/* projects list aside */}
        <Aside style={{ display: !scrolled ? "none" : "block" }}>
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
