import React, { Component } from "react";
import styled from "styled-components";
// import { withStyles } from "@material-ui/core";
import ProjectsList from "../components/ProjectsList";
import Project1 from "../components/Project1";
import Header from "../components/Header";
import D3Wrapper from "../components/D3Wrapper";

// Portfolio contains header, aside, projects
const Portfolio = styled.div`
  --black: #272727;
  --opac: 99;
  /* background: var(--black); */
  display: grid;

  grid-template-rows: 100vh auto;

  grid-template-columns: 1fr;

  .header {
    width: 100%;
  }
`;

const GridLeftRight = styled.div`
  display: grid;
  grid-template-columns: 205px 1fr;
  .gridUpDown {
    display: grid;
    grid-template-rows: 100vh repeat(auto-fit, 70vh);
  }
`;

const Projects = styled.main``;

// Projects Layout (below the Site Layout)

class IndexPage extends Component {
  state = {
    nodes: null,
    links: null,
    popup: false,
    lastScrollTop: 0,
  };

  componentWillMount = () => {
    const { edges } = this.props.data.allMarkdownRemark;
    const deepClone = d => JSON.parse(JSON.stringify(d));
    // const shallowClone = d => Object.assign({}, ...d);
    const newNodes = deepClone(edges.map(d => d.node.frontmatter));

    this.setState({
      nodes: newNodes,
    });
  };
  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    if (window.pageYOffset === 0) {
      this.setState({ scrolled: false });
    } else {
      this.setState({ scrolled: true });
    }

    const scrollFraction = window.pageYOffset / window.innerHeight;

    if (scrollFraction >= 0 && scrollFraction <= 1) {
      this.warpHero(scrollFraction);
    }

    // pop-up force sim at scroll ~ 0.85
    if (scrollFraction >= 0.75) {
      console.log("popup!");
      this.setState({ popup: true });
    } else if (scrollFraction < 0.55) {
      this.setState({ popup: false });
    }

    // detect scroll direction
    const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > this.state.lastScrollTop) {
      console.log("scrolling down");
      document.getElementById("hero").classList.remove("scrollingUp");
      console.log(document.getElementById("hero").classList);
      // downscroll code
    } else {
      document.getElementById("hero").classList.add("scrollingUp");
      console.log("scrolling up");
      // upscroll code
    }
    this.setState({ lastScrollTop: st <= 0 ? 0 : st }); // For Mobile or negative scrolling
  };

  warpHero = sf => {
    const heroImg = document.querySelector("#avatar");
    const intro = document.querySelector("header div");

    // scale out and rotate into the page
    intro.style.transform = `scale(${1 - Math.pow(sf, 0.85)}) translateY(${sf *
      window.innerHeight *
      0.5}px) rotateX(${sf * 90}deg)`;
    heroImg.style.transform = `rotateX(${sf * 90}deg)`;

    // perspective for header container
    intro.parentElement.style.perspective = `${(sf + 0.05) * 700}px`;

    // todo: trigger 'warp' animation at sf ~ 0.8
    // todo: after warp, POP back in at scroll close to 0.1
  };

  render() {
    const { data } = this.props;
    const { scrolled, nodes, popup } = this.state;

    const projects = data.allMarkdownRemark.edges
      .map(p => p.node)
      .sort((a, b) => a.frontmatter.year < b.frontmatter.year);

    // console.log("projects", projects);

    return (
      <Portfolio>
        {/* contains: header, aside, projects */}
        {/* header */}
        <Header className={"header"} popup={popup} />

        <GridLeftRight>
          {/* sticky projects list aside (left on desktop, bottom on mobile) */}
          <ProjectsList popup={popup} projects={projects} />

          <div className="gridUpDown">
            <D3Wrapper nodes={nodes} popup={popup} />

            <Projects>
              <Project1 />
            </Projects>
          </div>
        </GridLeftRight>
      </Portfolio>
    );
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
