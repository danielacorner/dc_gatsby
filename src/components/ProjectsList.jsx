import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
// import Link from "gatsby-link";
import Typography from "@material-ui/core/Typography";
import SvgIcons from "./SvgIcons";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
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
    --grey: rgba(121, 119, 123, 0.99);
    --lightgreyborder: 5px solid rgba(114, 114, 114, 0.9);
    border-top: var(--lightgreyborder);
    border-right: var(--lightgreyborder);
    border-bottom: var(--lightgreyborder);
    border-style: outset;
    padding-left: 20px;
    background: var(--grey);
    position: sticky;
    top: 0;
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    transition: all 0.7s ease-in-out;
    display: grid;
  }
  .listSection {
    display: grid;
    .ul {
      display: grid;
      grid-template-rows: 30px repeat(auto-fit, 115px);
      margin: 0;
      .subheader {
        display: grid;
        align-items: center;
        grid-gap: 10px;
        grid-template-columns: 1fr auto 1fr;
        color: rgba(255, 255, 255, 0.9);
        font-style: italic;
        font-size: 16px;
        font-family: "Roboto", sans-serif;
        padding-left: 8px;
        height: 40px;
        margin: 0;
        &:before,
        &:after {
          display: block;
          content: "";
          height: 2px;
          background: rgba(255, 255, 255, 0.9);
        }
      }
      .listItem {
        grid-template-rows: repeat(auto-fit, auto);
        grid-gap: 0px;
        padding: 0;
        margin: 0;
        display: grid;
        justify-items: start;
        align-content: center;
        .projectLink {
          font-size: 14px;
          text-align: left;
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
        .badges {
          padding-left: 16px;
          display: grid;
          grid-template-rows: 24px;
          grid-auto-flow: column;
          grid-column-gap: 5px;
          justify-items: center;
          justify-content: center;
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
        <List className={"listRoot"}>
          {/* for each year, add a header, then map over that year's projects */}
          {years.map(year => {
            if (year) {
              return (
                <li key={"sticky-" + year} className={"listSection"}>
                  <ul className={"ul"}>
                    <ListSubheader className={"subheader"}>
                      <span>{year}</span>
                    </ListSubheader>
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
                          <Typography className="badges" variant="caption">
                            {project.frontmatter.tools.map(tool => {
                              return <SvgIcons tool={tool} />;
                            })}
                          </Typography>
                        </ListItem>
                      ))}
                  </ul>
                </li>
              );
            }
          })}
        </List>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(ProjectsList);
