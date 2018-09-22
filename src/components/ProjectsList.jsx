import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
// import Link from "gatsby-link";
import Typography from "@material-ui/core/Typography";
import SvgIcons from "./SvgIcons";
import { navigateTo } from "gatsby-link";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import OpenIcon from "@material-ui/icons/OpenInNewOutlined";

const Wrapper = styled.aside`
  perspective: 800px;
  .listRoot {
    transform: rotateY(90deg) translateZ(-200px) translateX(50px);
  }
  &.enter {
    .listRoot {
      transform: rotateY(0) translateX(-5px) translateZ(0);
    }
  }
  .listRoot {
    --grey: rgba(100, 100, 200, 0.09);
    --lightgreyborder: 3px solid rgba(114, 114, 114, 0.9);
    padding: 0;
    background: var(--grey);
    position: sticky;
    top: 0;
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    transition: all 0.7s ease-in-out;
    display: grid;
    /* listRoot > ul > listItem > projectLink + badges */
    .ul {
      height: 99vh;
      display: grid;
      grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
      margin: 0;
      .listItem {
        display: grid;
        grid-template-rows: repeat(auto-fit, auto);
        grid-gap: 0px;
        justify-items: start;
        align-content: center;
        padding: 0 0 0 4px;
        margin: 0;
        transition: all ease-in-out 0.15s;
        cursor: pointer;
        .projectLink {
          font-size: 14px;
          text-align: left;
          text-transform: none;
          text-decoration: none;
          color: #eaeaea;
          &:hover {
            background-color: rgba(0, 0, 0, 0);
          }
        }
        &.glow {
          border-left: 10px solid #ffca2d;
          background: rgba(255, 255, 255, 0.1);
          .projectLink {
            text-decoration: underline;
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
    width: 255px;
    @media (max-width: 540px) {
      width: 200px;
      .listItem {
        padding: 0;
      }
    }
  }
`;

const ActionButtons = styled.div`
  height: 0px;
  opacity: 0;
  transition: all 0.1s ease-in-out;
  pointer-events: none;
  &.visible {
    pointer-events: auto;
    margin-top: 10px;
    height: 38px;
    opacity: 1;
  }
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  margin-left: 10px;
  button {
    text-transform: none;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.7);
    span {
      margin-bottom: 1px;
      svg {
        color: inherit;
        margin-top: -1px;
        margin-right: -2px;
      }
      display: grid;
      grid-gap: 2px;
      grid-template-columns: auto auto;
    }
  }
`;

const styles = {};

class ProjectsList extends Component {
  state = {
    visibleButtonsID: null,
  };

  componentDidMount() {
    const listItems = Array.from(document.querySelectorAll(".listItem"));

    listItems.forEach(item => {
      item.addEventListener("mouseover", this.highlightProject);
      item.addEventListener("mouseout", this.unhighlightProject);
    });
  }
  highlightProject(e) {
    // remove all glow
    document.querySelectorAll(".glow").forEach(item => {
      item.classList.remove("glow");
    });
    document
      .querySelectorAll(".projectCircle")
      .forEach(circle => (circle.style.filter = null));

    // add glow to list item
    const listItem = e.path.find(d => d.id.includes("listItem"));
    listItem.classList.add("glow");
    // add glow to node
    const circleID = listItem.id.slice("listItem_".length);
    document.getElementById(`circle_${circleID}`) &&
      (document.getElementById(`circle_${circleID}`).style.filter =
        "url(#glow)");
  }
  unhighlightProject(e) {
    const listItem = e.path.find(d => d.id.includes("listItem"));
    listItem.classList.remove("glow");

    const circleID = listItem.id.slice("listItem_".length);
    document.getElementById(`circle_${circleID}`) &&
      (document.getElementById(`circle_${circleID}`).style.filter = null);
  }
  handleClickOpenSite = url => {
    window.open(url, "_blank");
  };
  render() {
    const { projects, classes, popup, moreInfo, visibleButtonsID } = this.props;

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
                  className="listItem"
                  key={JSON.stringify(project)}
                  id={`listItem_${project.frontmatter.id}`}
                  data-circle={`circle_${project.frontmatter.id}`}
                  onClick={() =>
                    this.props.onChangeVisibility(project.frontmatter.id)
                  }
                >
                  <Button className="projectLink">
                    {project.frontmatter.title}
                  </Button>
                  <Typography className="badges" variant="caption">
                    {project.frontmatter.tools.map(tool => {
                      return <SvgIcons key={tool.toString()} tool={tool} />;
                    })}
                  </Typography>
                  <ActionButtons
                    className={`${visibleButtonsID === project.frontmatter.id &&
                      `visible`} actionButtons`}
                    id={`actionButtons_${project.frontmatter.id}`}
                  >
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => navigateTo(project.frontmatter.path)}
                      role="link"
                    >
                      <span>More Info</span>
                      <InfoIcon />
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      variant="outlined"
                      onClick={() =>
                        this.handleClickOpenSite(project.frontmatter.website)
                      }
                    >
                      <span>Open Site</span>
                      <OpenIcon />
                    </Button>
                  </ActionButtons>
                </ListItem>
              ))}
          </ul>
        </List>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(ProjectsList);
