import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";

import "./index.css";
import "./animations.css";
import "./simulation.css";

const Page = styled.div`
  width: 100%;
  display: grid;
  /* grid-template-rows: 100vh auto auto; */
  padding: 0;
  margin: 0;
  background-image: url("https://image.ibb.co/eUQPcK/ep_naturalblack.png"); /* fallback */
  background-image: radial-gradient(
      circle,
      #02418980,
      #04367380,
      #052c5d80,
      #06224880,
      #06183480
    ),
    url("https://image.ibb.co/eUQPcK/ep_naturalblack.png");
`;

// Site Layout

class Layout extends Component {
  render() {
    const { children, data } = this.props;
    return (
      <Page>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: "description",
              content:
                "This is a web developer portfolio page for Daniel Corner, using Gatsby and React.",
            },
            {
              name: "keywords",
              content: "gatsby, react, web developer, portfolio",
            },
          ]}
        >
          <link
            href="https://fonts.googleapis.com/css?family=Oxygen+Mono"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Oxygen"
            rel="stylesheet"
          />
        </Helmet>

        {/* main */}
        {children()}
      </Page>
    );

    this.propTypes = {
      children: PropTypes.func,
    };
  }
}

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
