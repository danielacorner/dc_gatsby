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
          <TableauImg>
            <img src={tableau} />
          </TableauImg>
        );
        break;
      case "GraphQL":
        return <IconImg src={graphql} />;
        break;
      case "es6":
        return <IconImg src={es6} />;
        break;
      case "MongoDB":
        return <IconImg src={mongodb} />;
        break;
      case "Node.js":
        return <IconImg src={nodejs} />;
        break;
      case "React":
        return <IconImg src={react} />;
        break;
      case "Angular":
        return <IconImg src={angular} />;
        break;
      case "JavaScript":
        return <IconImg src={javascript} />;
        break;
      case "CSS":
      case "CSS3":
        return <IconImg src={css3} />;
        break;
      case "HTML":
      case "HTML5":
        return <IconImg src={html5} />;
        break;
      case "Excel":
        return <IconImg src={excel} />;
        break;
      case "Materialize CSS":
        return <IconImg src={materializecss} />;
        break;
      case "Material-UI":
        return <IconImg src={materialui} />;
        break;
      case "Sass":
      case "SCSS":
        return <IconImg src={sass} />;
        break;
      case "D3.js":
        return <IconImg src={d3js} />;
        break;
      case "jQuery":
        return <IconImg src={jquery} />;
        break;

      default:
        return null;
        break;
    }
  }
}
