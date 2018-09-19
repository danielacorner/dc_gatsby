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
  display: grid;

  grid-template-rows: 100vh auto auto;

  grid-template-columns: 1fr;
  grid-template-areas:
    "head"
    "proj";
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
  };
  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    if (window.pageYOffset === 0) {
      this.setState({ scrolled: false });
    } else {
      this.setState({ scrolled: true });
    }
    const intro = document.querySelector("header div");
    const scrollFraction =
      (window.innerHeight - window.pageYOffset) / window.innerHeight;
    intro.style.transform = `scale(${scrollFraction}) translateY(${(window.innerHeight -
      scrollFraction * window.innerHeight) *
      0.75}px) rotateX(${(1 - scrollFraction) * 90}deg)`;
    intro.parentElement.style.perspective = `${(1 - scrollFraction) * 800}px`;
  };

  render() {
    const { data, classes } = this.props;
    const { scrolled, nodes } = this.state;

    const projects = data.allMarkdownRemark.edges
      .map(p => p.node)
      .sort((a, b) => a.frontmatter.year < b.frontmatter.year);

    // console.log("projects", projects);

    return (
      <Portfolio>
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
