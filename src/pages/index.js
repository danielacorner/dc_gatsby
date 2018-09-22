import React, { Component } from "react";
import MainPortfolio from "../components/MainPortfolio";

class IndexPage extends Component {
  render() {
    return <MainPortfolio data={this.props.data} />;
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            id
            title
            desc
            caption
            year
            path
            radius
            tools
            image
            imgThumb
            website
          }
        }
      }
    }
  }
`;

export default IndexPage;
