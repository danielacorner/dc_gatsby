import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Header from "../components/header";
import styled from "styled-components";

import "./index.css";
import "./simulation.css";

class Layout extends Component {
  render() {
    const Page = styled.div`
      position: absolute;
      top: 0;
      bottom: 0;
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
        "header header header header"
        "content content content content"
        "footer footer footer footer";
    `;
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
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            gridArea: "content",
            margin: "0 auto",
            maxWidth: 960,
            padding: "0px 1.0875rem 1.45rem",
            paddingTop: 0,
          }}
        >
          {children()}
        </div>
        <footer
          style={{
            gridArea: "footer",

            color: "white",
            width: "100%",
            background: "#333",
          }}
        >
          here's a footer
        </footer>
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
