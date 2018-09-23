import React, { Component } from "react";
import styled from "styled-components";

import jquery from "../images/logos/jquery.svg";
import sass from "../images/logos/sass.svg";
import angular from "../images/logos/angular.svg";
import css3 from "../images/logos/css3.svg";
import javascript from "../images/logos/javascript.svg";
import graphql from "../images/logos/graphql.svg";
import d3js from "../images/logos/d3.svg";
import es6 from "../images/logos/es6.svg";
import html5 from "../images/logos/html5.svg";
import materialui from "../images/logos/material-ui.svg";
import materializecss from "../images/logos/materializecss.svg";
import mongodb from "../images/logos/mongodb.svg";
import nodejs from "../images/logos/nodejs.svg";
import react from "../images/logos/react.svg";
import excel from "../images/logos/excel.svg";
import tableau from "../images/logos/tableau.svg";
import gatsby from "../images/logos/gatsby.svg";

import Tooltip from "@material-ui/core/Tooltip";

const IconImg = styled.img`
  height: 24px;
  width: 24px;
`;
const TableauImg = styled.div`
  position: relative;
  width: 150px;
  height: 24px;
  img {
    width: 145px;
    height: 24px;
    object-fit: cover;
    margin-left: -18px;
  }
`;
export default class SvgIcons extends Component {
  render() {
    const { tool } = this.props;
    switch (tool) {
      case "Tableau":
        return (
          <Tooltip title="Tableau">
            <TableauImg>
              <img src={tableau} alt="Tableau" />
            </TableauImg>
          </Tooltip>
        );
        break;
      case "GraphQL":
        return (
          <Tooltip title="GraphQL">
            <IconImg src={graphql} alt="GraphQL" />
          </Tooltip>
        );
        break;
      case "es6":
        return (
          <Tooltip title="ES6">
            <IconImg src={es6} alt="ES6" />
          </Tooltip>
        );
        break;
      case "MongoDB":
        return (
          <Tooltip title="MongoDB">
            <IconImg src={mongodb} alt="MongoDB" />
          </Tooltip>
        );
        break;
      case "Node.js":
        return (
          <Tooltip title="Node.js">
            <IconImg src={nodejs} alt="Node.js" />
          </Tooltip>
        );
        break;
      case "React":
        return (
          <Tooltip title="React">
            <IconImg src={react} alt="React" />
          </Tooltip>
        );
        break;
      case "Angular":
        return (
          <Tooltip title="Angular">
            <IconImg src={angular} alt="Angular" />
          </Tooltip>
        );
        break;
      case "JavaScript":
        return (
          <Tooltip title="JavaScript">
            <IconImg src={javascript} alt="JavaScript" />
          </Tooltip>
        );
        break;
      case "CSS":
      case "CSS3":
        return (
          <Tooltip title="CSS3">
            <IconImg src={css3} alt="CSS3" />
          </Tooltip>
        );
        break;
      case "HTML":
      case "HTML5":
        return (
          <Tooltip title="HTML5">
            <IconImg src={html5} alt="HTML5" />
          </Tooltip>
        );
        break;
      case "Excel":
        return (
          <Tooltip title="Excel">
            <IconImg src={excel} alt="Excel" />
          </Tooltip>
        );
        break;
      case "Materialize CSS":
        return (
          <Tooltip title="Materialize CSS">
            <IconImg src={materializecss} alt="Materialize CSS" />
          </Tooltip>
        );
        break;
      case "Material-UI":
        return (
          <Tooltip title="Material-UI">
            <IconImg src={materialui} alt="Material-UI" />
          </Tooltip>
        );
        break;
      case "Sass":
      case "SCSS":
        return (
          <Tooltip title="Sass">
            <IconImg src={sass} alt="Sass" />
          </Tooltip>
        );
        break;
      case "D3.js":
        return (
          <Tooltip title="D3.js">
            <IconImg src={d3js} alt="D3.js" />
          </Tooltip>
        );
        break;
      case "jQuery":
        return (
          <Tooltip title="jQuery">
            <IconImg src={jquery} alt="jQuery" />
          </Tooltip>
        );
        break;
      case "Gatsby":
        return (
          <img
            src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJFYmVuZV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMTA2IDI4IiB4bWw6c3BhY2U9InByZXNlcnZlIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDYgMjgiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNmZmZ9LnN0MXtmaWxsOiM2Mzl9PC9zdHlsZT48Zz48cGF0aCBkPSJNNjIuOSwxMmgyLjh2MTBoLTIuOHYtMS4zYy0xLDEuNS0yLjMsMS42LTMuMSwxLjZjLTMuMSwwLTUuMS0yLjQtNS4xLTUuM2MwLTMsMi01LjMsNC45LTUuM2MwLjgsMCwyLjMsMC4xLDMuMiwxLjZWMTJ6IE01Ny43LDE3YzAsMS42LDEuMSwyLjgsMi44LDIuOGMxLjYsMCwyLjgtMS4yLDIuOC0yLjhjMC0xLjYtMS4xLTIuOC0yLjgtMi44QzU4LjksMTQuMiw1Ny43LDE1LjQsNTcuNywxN3oiLz48cGF0aCBkPSJNNzEuMiwxNC40VjIyaC0yLjh2LTcuNmgtMS4xVjEyaDEuMVY4LjZoMi44VjEyaDEuOXYyLjRINzEuMnoiLz48cGF0aCBkPSJNNzkuNywxNC40Yy0wLjctMC42LTEuMy0wLjctMS42LTAuN2MtMC43LDAtMS4xLDAuMy0xLjEsMC44YzAsMC4zLDAuMSwwLjYsMC45LDAuOWwwLjcsMC4yYzAuOCwwLjMsMiwwLjYsMi41LDEuNCBjMC4zLDAuNCwwLjUsMSwwLjUsMS43YzAsMC45LTAuMywxLjgtMS4xLDIuNWMtMC44LDAuNy0xLjgsMS4xLTMsMS4xYy0yLjEsMC0zLjItMS0zLjktMS43bDEuNS0xLjdjMC42LDAuNiwxLjQsMS4yLDIuMiwxLjIgYzAuOCwwLDEuNC0wLjQsMS40LTEuMWMwLTAuNi0wLjUtMC45LTAuOS0xbC0wLjYtMC4yYy0wLjctMC4zLTEuNS0wLjYtMi4xLTEuMmMtMC41LTAuNS0wLjgtMS4xLTAuOC0xLjljMC0xLDAuNS0xLjgsMS0yLjMgYzAuOC0wLjYsMS44LTAuNywyLjYtMC43YzAuNywwLDEuOSwwLjEsMy4yLDEuMUw3OS43LDE0LjR6Ii8+PHBhdGggZD0iTTg1LjgsMTMuM2MxLTEuNCwyLjQtMS42LDMuMi0xLjZjMi45LDAsNC45LDIuMyw0LjksNS4zYzAsMy0yLDUuMy01LDUuM2MtMC42LDAtMi4xLTAuMS0zLjItMS42VjIySDgzVjUuMmgyLjhWMTMuM3ogTTg1LjUsMTdjMCwxLjYsMS4xLDIuOCwyLjgsMi44YzEuNiwwLDIuOC0xLjIsMi44LTIuOGMwLTEuNi0xLjEtMi44LTIuOC0yLjhDODYuNiwxNC4yLDg1LjUsMTUuNCw4NS41LDE3eiIvPjxwYXRoIGQ9Ik05OC41LDIwLjVMOTMuNywxMkg5N2wzLjEsNS43bDIuOC01LjdoMy4ybC04LDE1LjNoLTMuMkw5OC41LDIwLjV6Ii8+PHBhdGggZD0iTTU0LDEzLjdoLTIuOGMwLDAtNC4yLDAtNC4yLDB2Mi44aDMuN2MtMC42LDEuOS0yLDMuMi00LjYsMy4yYy0yLjksMC01LTIuNC01LTUuM1M0My4xLDksNDYsOWMxLjYsMCwzLjIsMC44LDQuMiwyLjEgbDIuMy0xLjVDNTEsNy41LDQ4LjYsNi4zLDQ2LDYuM2MtNC40LDAtOCwzLjYtOCw4LjFzMy40LDguMSw4LDguMXM4LTMuNiw4LTguMUM1NC4xLDE0LjEsNTQsMTMuOSw1NCwxMy43eiIvPjwvZz48Zz48Zz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjUsMTRoLTd2Mmg0LjhjLTAuNywzLTIuOSw1LjUtNS44LDYuNUw1LjUsMTFjMS4yLTMuNSw0LjYtNiw4LjUtNmMzLDAsNS43LDEuNSw3LjQsMy44bDEuNS0xLjMgQzIwLjksNC44LDE3LjcsMywxNCwzQzguOCwzLDQuNCw2LjcsMy4zLDExLjZsMTMuMiwxMy4yQzIxLjMsMjMuNiwyNSwxOS4yLDI1LDE0eiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zLDE0LjFjMCwyLjgsMS4xLDUuNSwzLjIsNy42YzIuMSwyLjEsNC45LDMuMiw3LjYsMy4yTDMsMTQuMXoiLz48L2c+PHBhdGggY2xhc3M9InN0MSIgZD0iTTE0LDBDNi4zLDAsMCw2LjMsMCwxNHM2LjMsMTQsMTQsMTRzMTQtNi4zLDE0LTE0UzIxLjcsMCwxNCwweiBNNi4yLDIxLjhjLTIuMS0yLjEtMy4yLTQuOS0zLjItNy42TDEzLjksMjUgQzExLjEsMjQuOSw4LjMsMjMuOSw2LjIsMjEuOHogTTE2LjQsMjQuN0wzLjMsMTEuNkM0LjQsNi43LDguOCwzLDE0LDNjMy43LDAsNi45LDEuOCw4LjksNC41bC0xLjUsMS4zQzE5LjcsNi41LDE3LDUsMTQsNSBjLTMuOSwwLTcuMiwyLjUtOC41LDZMMTcsMjIuNWMyLjktMSw1LjEtMy41LDUuOC02LjVIMTh2LTJoN0MyNSwxOS4yLDIxLjMsMjMuNiwxNi40LDI0Ljd6Ii8+PC9nPjwvc3ZnPg=="
            alt="Gatsby logo"
          />
        );
        break;

      default:
        return null;
        break;
    }
  }
}
