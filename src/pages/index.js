import React from "react";
import Link from "gatsby-link";

const IndexPage = ({ data }) => {
  return (
    <div>
      <h1>Hi people</h1>
      <ul>
        {data.allMarkdownRemark.edges.map(project => (
          <li key={project.node.id}>
            <Link to={project.node.frontmatter.path}>
              {project.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

export default IndexPage;
