import React, { Component } from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import createForceSimulation from "../components/forceSimulation";
class IndexPage extends Component {
  state = { nodes: null };
  componentWillMount = () => {
    const newNodes = JSON.parse(
      JSON.stringify(
        this.props.data.allMarkdownRemark.edges.map(d => d.node.frontmatter)
      )
    );

    this.setState({
      nodes: newNodes,
    });
  };
  render() {
    const { data } = this.props;

    const Container = styled.main`
      background: aliceblue;
      height: 100%;

      display: grid;
      grid-gap: 10px;
      grid-template-rows: auto repeat(3, 1fr);
      grid-template-columns: 1fr repeat(3, 25%);
      grid-template-areas:
        "side side side side"
        "main main main main"
        "main main main main"
        "main main main main";
      @media (min-width: 700px) {
        grid-template-areas:
          "side main main main"
          "side main main main"
          "side main main main"
          "side main main main";
      }

      aside {
        grid-area: side;
      }
    `;
    const MainContent = styled.section`
      background: wheat;

      grid-area: main;

      display: grid;
      grid-template-rows: repeat(3, 25%) 1fr;
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas:
        "canv canv canv canv"
        "canv canv canv canv"
        "canv canv canv canv"
        "info info info info";

      svg {
        grid-area: canv;
        width: 100%;
        height: 100%;
        background: #999;
      }
      p {
        grid-area: info;
        background: #bada55;
      }
    `;

    const projects = data.allMarkdownRemark.edges.map(p => p.node);
    return (
      <Container>
        <aside>
          <ul>
            {projects.map(project => (
              <li key={project.id}>
                <Link to={project.frontmatter.path}>
                  {project.frontmatter.title}
                </Link>
                <Typography variant="caption">
                  Tools: {project.frontmatter.tools.join(", ")}
                </Typography>
              </li>
            ))}
          </ul>
        </aside>

        <MainContent>
          <svg className="canvas" />
          <p>
            This section contains a canvas on which d3 appends circles for each
            project. Hover the circles to highlight the sidebar, and vice versa
          </p>
        </MainContent>
      </Container>
    );
  }
  componentDidMount() {
    createForceSimulation(this.state.nodes);
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            path
            radius
            tools
          }
        }
      }
    }
  }
`;

export default IndexPage;
