import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";

export default function Template({ data }) {
  const { markdownRemark: project } = data;
  // const project = data.markdownRemark;
  return (
    <div>
      <h1>{project.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: project.html }} />
      <ul>{project.frontmatter.tools.map(tool => <li>{tool}</li>)}</ul>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
}

export const projectQuery = graphql`
  query ProjectByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        tools
      }
    }
  }
`;
