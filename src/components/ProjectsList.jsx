import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
// import Link from "gatsby-link";
import Typography from "@material-ui/core/Typography";
import SvgIcons from "./SvgIcons";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import styled from "styled-components";

const Wrapper = styled.aside`
  width: 255px;
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
    background: rgba(121, 119, 123, 0.99);
    position: sticky;
    top: 0;
    max-height: 100vh;
    overflow-y: scroll;
    transition: all 0.7s ease-in-out;
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
          font-size: 14px;
          text-transform: none;
          text-decoration: none;
          color: #eaeaea;
          &:hover {
            text-decoration: underline;
            background-color: hsl(0, 0%, 95%);
          }
        }
        &.selected {
          color: black;
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
                      <ListItem
                        divider={true}
                        className={"listItem"}
                        key={project.id}
                      >
                        <Button
                          className={"projectLink"}
                          to={project.frontmatter.path}
                        >
                          {project.frontmatter.title}
                        </Button>
                        <Typography variant="caption">
                          {project.frontmatter.tools.map(tool => {
                            return <SvgIcons tool={tool} />;
                          })}
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
