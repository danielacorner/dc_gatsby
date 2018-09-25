import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "styled-components";

import "./index.css";
import "./animations.css";
import "./simulation.css";
import SvgIcons from "../components/SvgIcons";

const Page = styled.div`
  width: 100%;
  display: grid;
  /* grid-template-rows: 100vh auto auto; */
  padding: 0;
  margin: 0;
  margin-bottom: -4px;

  position: relative;
  .gatsby {
    color: rgba(255, 255, 255, 0.4);
    font-family: "Spectral", "Georgia", "Times New Roman", "Times", serif;
    font-weight: 100;
    :before {
      display: block;
      margin: 0 0 -9px 4px;
      font-size: 10px;
      content: "powered by";
    }
    position: absolute;
    bottom: 0;
    left: 5px;
    img {
      margin: 0;
    }
  }
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
                "Web developer portfolio page for Daniel Corner, using Gatsby and React.",
            },
            {
              name: "keywords",
              content: "gatsby, react, web developer, portfolio",
            },
          ]}
        >
          <link rel="icon" type="image/png" href="../images/logos/react.png" />
          <link
            href="https://fonts.googleapis.com/css?family=Oxygen+Mono"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Oxygen"
            rel="stylesheet"
          />
          <script
            type="text/javascript"
            src="https://cdn.emailjs.com/sdk/2.2.4/email.min.js"
          />
          {/* <script type="text/javascript">
            (function()
            {emailjs.init("user_Q33dPgBWZuQnRTaTJfkVq")}
            )();
          </script> */}
        </Helmet>

        {/* main */}
        {children()}
        <div className="gatsby">
          <SvgIcons tool="Gatsby" />
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
