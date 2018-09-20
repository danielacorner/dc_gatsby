import React, { Component } from "react";
import styled from "styled-components";

import angular from "../../public/images/logos/angular.svg";
import css3 from "../../public/images/logos/css3.svg";
import javascript from "../../public/images/logos/javascript.svg";
import graphql from "../../public/images/logos/graphql.svg";
import d3js from "../../public/images/logos/d3.svg";
import es6 from "../../public/images/logos/es6.svg";
import html5 from "../../public/images/logos/html5.svg";
import materialui from "../../public/images/logos/material-ui.svg";
import materializecss from "../../public/images/logos/materializecss.svg";
import mongodb from "../../public/images/logos/mongodb.svg";
import nodejs from "../../public/images/logos/nodejs.svg";
import react from "../../public/images/logos/react.svg";
import excel from "../../public/images/logos/excel.svg";
import tableau from "../../public/images/logos/tableau.svg";

const IconImg = styled.img`
  height: 24px;
  width: 24px;
`;
const TableauImg = styled.div`
  position: relative;
  width: 150px;
  height: 24px;
  img {
    object-fit: cover;
    margin-top: -13px;
    margin-left: 10px;
    /* position: absolute; */
    /* clip: rectangle(20px, 140px, 60px, 10px); */
  }
`;
export default class SvgIcons extends Component {
  render() {
    const { tool } = this.props;
    console.log(tool);
    switch (tool) {
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
      case "Tableau":
        return (
          <TableauImg>
            <img src={tableau} />
          </TableauImg>
        );
        break;

      default:
        return null;
        break;
    }
  }
}
