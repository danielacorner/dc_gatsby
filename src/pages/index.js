import React, { Component } from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ForceSimulation from "../components/forceSimulation";
// import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";

const Container = styled.main`
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
  background: wheat;

  grid-area: main;

  display: grid;
  grid-template-rows: repeat(3, 25%) 1fr;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "canv canv canv canv"
    "canv canv canv canv"
    "canv canv canv canv"
    "info info info info";

  svg {
    grid-area: canv;
    width: 100%;
    height: 100%;
    background: white;
  }
  p {
    grid-area: info;
    background: #bada55;
  }
`;

const styles = {
  listRoot: {
    display: "grid",
  },
  listSection: {
    display: "grid",
  },
  ul: {
    margin: 0,
    display: "grid",
  },
  subheader: {
    paddingLeft: "0px",
    marginBottom: "5px",
    height: "22px",
    margin: 0,
  },
  listItem: {
    margin: 0,
    display: "grid",
  },
  projectLink: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "underline",
      backgroundColor: "hsl(0, 0%, 95%)",
    },
  },
};

class IndexPage extends Component {
  state = {
    nodes: null,
    links: null,
  };
  componentWillMount = () => {
    const { edges } = this.props.data.allMarkdownRemark;
    const deepClone = d => JSON.parse(JSON.stringify(d));
    const shallowClone = d => Object.assign({}, ...d);
    const newNodes = deepClone(edges.map(d => d.node.frontmatter));

    this.setState({
      nodes: newNodes,
    });
  };
  render() {
    const { data, classes } = this.props;

    const projects = data.allMarkdownRemark.edges
      .map(p => p.node)
      .sort((a, b) => a.frontmatter.year < b.frontmatter.year);

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    const years = projects.map(p => p.frontmatter.year).filter(onlyUnique);

    // console.log("projects", projects);

    return (
      <Container>
        <aside>
          <List className={classes.listRoot} subheader={<li />}>
            {/* for each year, add a header, then map over that year's projects */}
            {years.map(year => {
              return (
                <li key={"sticky-" + year} className={classes.listSection}>
                  <ul className={classes.ul}>
                    <ListSubheader className={classes.subheader}>
                      {year}
                    </ListSubheader>
                    {projects
                      .filter(project => project.frontmatter.year === year)
                      .map(project => (
                        <ListItem className={classes.listItem} key={project.id}>
                          <Link
                            className={classes.projectLink}
                            to={project.frontmatter.path}
                          >
                            {project.frontmatter.title}
                          </Link>
                          <Typography variant="caption">
                            {project.frontmatter.tools.join(" | ")}
                          </Typography>
                        </ListItem>
                      ))}
                  </ul>
                </li>
              );
            })}
          </List>
        </aside>

        <MainContent>
          <svg className="canvas">
            {/* todo: links */}
            <ForceSimulation graph={{ nodes: this.state.nodes }} />
          </svg>
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
          }
        }
      }
    }
  }
`;

export default withStyles(styles)(IndexPage);
