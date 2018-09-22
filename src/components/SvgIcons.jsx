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
            <img src={tableau} alt="Tableau" title="Tableau" />
          </TableauImg>
        );
        break;
      case "GraphQL":
        return <IconImg src={graphql} alt="GraphQL" title="GraphQL" />;
        break;
      case "es6":
        return <IconImg src={es6} alt="es6" title="es6" />;
        break;
      case "MongoDB":
        return <IconImg src={mongodb} alt="MongoDB" title="MongoDB" />;
        break;
      case "Node.js":
        return <IconImg src={nodejs} alt="Node.js" title="Node.js" />;
        break;
      case "React":
        return <IconImg src={react} alt="React" title="React" />;
        break;
      case "Angular":
        return <IconImg src={angular} alt="Angular" title="Angular" />;
        break;
      case "JavaScript":
        return <IconImg src={javascript} alt="JavaScript" title="JavaScript" />;
        break;
      case "CSS":
      case "CSS3":
        return <IconImg src={css3} alt="CSS3" title="CSS3" />;
        break;
      case "HTML":
      case "HTML5":
        return <IconImg src={html5} alt="HTML5" title="HTML5" />;
        break;
      case "Excel":
        return <IconImg src={excel} alt="Excel" title="Excel" />;
        break;
      case "Materialize CSS":
        return (
          <IconImg
            src={materializecss}
            alt="Materialize CSS"
            title="Materialize CSS"
          />
        );
        break;
      case "Material-UI":
        return (
          <IconImg src={materialui} alt="Material-UI" title="Material-UI" />
        );
        break;
      case "Sass":
      case "SCSS":
        return <IconImg src={sass} alt="Sass" title="Sass" />;
        break;
      case "D3.js":
        return <IconImg src={d3js} alt="D3.js" title="D3.js" />;
        break;
      case "jQuery":
        return <IconImg src={jquery} alt="jQuery" title="jQuery" />;
        break;

      default:
        return null;
        break;
    }
  }
}
