import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
// import Link from "gatsby-link";
import Typography from "@material-ui/core/Typography";
import SvgIcons from "./SvgIcons";
import { navigateTo } from "gatsby-link";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styled from "styled-components";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import OpenIcon from "@material-ui/icons/OpenInNewOutlined";

const Wrapper = styled.aside`
  .listRoot {
    /* transform: rotateY(90deg) translateZ(-200px) translateX(50px); */
  }
  &.enter {
    .listRoot {
      /* transform: rotateY(0) translateX(-5px) translateZ(0); */
    }
  }
  .listRoot {
    --grey: rgba(100, 100, 200, 0.09);
    --lightgreyborder: 3px solid rgba(114, 114, 114, 0.9);
    padding: 0;
    margin-left: 0;
    transition: all 0.5s ease-in-out;
    /* listRoot > ul > listItem > projectTitle + badges */
    .ul {
      padding: 120px 20px;
      display: grid;
      grid-gap: 130px;
      justify-content: center;
      /* grid-template-rows: repeat(auto-fill, auto); */
      margin: 0;
      margin-left: 0px;
      .listItem {
        background: var(--grey);
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
          0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        opacity: 1;
        display: grid;
        grid-template-rows: 90px auto auto auto;
        grid-gap: 10px;
        justify-content: center;
        justify-items: center;
        align-content: start;
        text-align: center;
        padding: 0 30px 20px 30px;
        margin: 0;
        height: auto;
        transition: all ease-in-out 0.15s;
        .heroImg {
          box-shadow: 0 -2px 16px 2px rgba(0, 0, 0, 0.24);
          width: 180px;
          height: 180px;
          margin: 0;
          margin-top: -90px;
          border-radius: 100%;
        }
        .projectTitle {
          padding: 0;
          cursor: default;
          border: none;
          background: none;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          font-size: 18px;
          text-align: center;
          text-transform: none;
          text-decoration: none;
          color: #eaeaea;
          &:hover {
            background-color: rgba(0, 0, 0, 0);
          }
        }
        .badges {
          padding-bottom: 5px;
          display: grid;
          grid-template-rows: 24px;
          grid-auto-flow: column;
          grid-column-gap: 5px;
          justify-items: center;
          justify-content: center;
        }
        .caption {
          color: #eaeaea;
          padding-bottom: 5px;
        }
      }
    }
  }
`;

const ActionButtons = styled.div`
  transition: all 0.1s ease-in-out;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  @media (max-width: 540px) {
    grid-gap: 20px;
    place-items: center center;
    span {
      font-size: 18px;
    }
  }
  button {
    cursor: pointer;
    padding: 0;
    border-radius: 4px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    border-radius: 4px;
    width: 145px;
    height: 45px;
    text-transform: none;
    background: rgba(255, 255, 255, 0.08);
    color: lightpink;
    border: 1px solid rgba(245, 0, 87, 0.5);
    &:hover {
      background: rgba(245, 0, 87, 0.08);
    }
    svg {
      fill: lightpink;
    }
    &:first-child {
      text-decoration: underline;
      color: #85c7ff;
      border: 1px solid rgba(63, 81, 181, 0.5);
      svg {
        fill: #85c7ff;
      }
      &:hover {
        background: #00008033;
      }
    }
    span {
      align-items: center;
      place-content: center center;
      svg {
        height: 24px;
        color: inherit;
        margin-top: -1px;
        margin-left: 0px;
        margin-right: -15px;
      }
      display: grid;
      grid-gap: 10px;
      grid-template-columns: auto auto;
    }
    .jss72 {
      display: none;
    }
  }
`;

const styles = {};

class ProjectsListMobile extends Component {
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
  handleNavigate = path => {
    // add swoosh animation then navigate
    const projectsGrid = document.getElementById("projectsGrid");
    projectsGrid.addEventListener("transitionend", () => navigateTo(path));
    projectsGrid.classList.add("swoosh");
  };
  render() {
    const { projects, classes, popup, moreInfo, visibleButtonsID } = this.props;

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    const years = projects.map(p => p.frontmatter.year).filter(onlyUnique);

    return (
      <Wrapper className={popup && "enter"}>
        {/* listRoot > ul > listItem > projectTitle + badges */}
        <List className="listRoot">
          <ul className="ul" style={{ margin: "0" }}>
            {projects
              .sort((a, b) => a.frontmatter.id < b.frontmatter.id)
              .map(project => (
                <ListItem
                  key={JSON.stringify(project)}
                  divider={true}
                  className="listItem"
                  id={`listItem_${project.frontmatter.id}`}
                  data-circle={`circle_${project.frontmatter.id}`}
                  onClick={() => {
                    this.props.onChangeVisibility(project.frontmatter.id);
                  }}
                >
                  <img className="heroImg" src={project.frontmatter.imgThumb} />
                  <Button
                    className="projectTitle"
                    disableRipple={true}
                    disableTouchRipple={true}
                  >
                    {project.frontmatter.title}
                  </Button>
                  <Typography className="badges" variant="caption">
                    {project.frontmatter.tools.map(tool => {
                      return <SvgIcons key={tool.toString()} tool={tool} />;
                    })}
                  </Typography>
                  <Typography className="caption" variant="subheading">
                    {project.frontmatter.caption}
                  </Typography>
                  <ActionButtons
                    className={`visible actionButtons`}
                    id={`actionButtons_${project.frontmatter.id}`}
                  >
                    <Button
                      onClick={() =>
                        this.handleNavigate(project.frontmatter.path)
                      }
                      role="link"
                    >
                      <span>
                        More Info
                        <InfoIcon />
                      </span>
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(project.frontmatter.website, "_blank")
                      }
                    >
                      <span>
                        Visit Site
                        <OpenIcon />
                      </span>
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

export default withStyles(styles)(ProjectsListMobile);
