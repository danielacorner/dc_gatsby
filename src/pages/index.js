import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import ProjectsList from "../components/ProjectsList";
import Project1 from "../components/Project1";
import Header from "../components/Header";

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

const Projects = styled.main``;

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
        <Header scrolled={scrolled} nodes={nodes} />
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
