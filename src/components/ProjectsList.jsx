import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Link from "gatsby-link";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import styled from "styled-components";

const Wrapper = styled.aside`
  width: 205px;
  position: sticky;
  top: 0;
  perspective: 800px;
  &.exit {
    .listRoot {
      transform: rotateY(90deg) translateZ(-200px) translateX(50px);
      /* transform: translateX(-100px) rotateY(90deg); */
    }
  }
  &.enter {
    .listRoot {
      /* transform: translateX(0) rotateY(0); */
      transform: rotateY(0) translateX(-5px) translateZ(0);
    }
  }
  .listRoot {
    padding-left: 20px;
    background: rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    max-height: 100vh;
    overflow-y: scroll;
    transition: all 1s ease-in;
    display: "grid";
  }
  .listSection {
    display: grid;
    .ul {
      margin: 0;
      display: grid;
      .subheader {
        padding-left: 0px;
        height: 22px;
        margin: 0;
      }
      .listItem {
        margin: 0;
        display: grid;
        .projectLink {
          text-decoration: none;
          color: #272727;
          &:hover {
            text-decoration: underline;
            background-color: hsl(0, 0%, 95%);
          }
        }
      }
    }
  }
`;

const styles = {};

class ProjectsList extends Component {
  render() {
    const { projects, classes, popup } = this.props;

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    const years = projects.map(p => p.frontmatter.year).filter(onlyUnique);

    return (
      <Wrapper className={popup ? "enter" : "exit"}>
        <List className={"listRoot"} subheader={<li />}>
          {/* for each year, add a header, then map over that year's projects */}
          {years.map(year => {
            return (
              <li key={"sticky-" + year} className={"listSection"}>
                <ul className={"ul"}>
                  <ListSubheader className={"subheader"}>{year}</ListSubheader>
                  {projects
                    .filter(project => project.frontmatter.year === year)
                    .map(project => (
                      <ListItem className={"listItem"} key={project.id}>
                        <Link
                          className={"projectLink"}
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
      </Wrapper>
    );
  }
}

export default withStyles(styles)(ProjectsList);
