import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
// import Link from "gatsby-link";
import Typography from "@material-ui/core/Typography";
// import SvgIcons from "./SvgIcons";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";

const Wrapper = styled.aside`
  width: 255px;
  /* position: sticky;
  top: 0; */
  perspective: 800px;
  /* &.exit { */
  .listRoot {
    transform: rotateY(90deg) translateZ(-200px) translateX(50px);
    /* transform: translateX(-100px) rotateY(90deg); */
  }
  &.enter {
    .listRoot {
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
    /* listRoot > ul > listItem > projectLink + badges */
    .ul {
      display: grid;
      grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
      margin: 0;
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
      <Wrapper className={popup && "enter"}>
        {/* listRoot > ul > listItem > projectLink + badges */}
        <List className={"listRoot"}>
          <ul className={"ul"}>
            {projects
              .sort((a, b) => a.frontmatter.id < b.frontmatter.id)
              .map(project => (
                <ListItem
                  divider={true}
                  className={"listItem"}
                  key={project.id.toString()}
                >
                  <Button
                    className={"projectLink"}
                    // to={project.frontmatter.path}
                  >
                    {project.frontmatter.title}
                  </Button>
                  <Typography className="badges" variant="caption">
                    {project.frontmatter.tools.map(tool => {
                      return null;
                      // return <SvgIcons key={tool.toString()} tool={tool} />;
                    })}
                  </Typography>
                </ListItem>
              ))}
          </ul>
        </List>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(ProjectsList);
