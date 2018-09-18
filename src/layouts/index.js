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
  grid-template-rows: 100vh auto auto;
  padding: 0;
  margin: 0;
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
        />

        {/* header */}
        <div
          style={{
            margin: "0 auto",
            // maxWidth: 960,
            padding: "0px 1.0875rem 1.45rem",
            paddingTop: 0,
          }}
        >
          {children()}
        </div>
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
