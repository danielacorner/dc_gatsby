import React, { Component } from "react";
import styled from "styled-components";
// import { withStyles } from "@material-ui/core";
import ProjectsList from "../components/ProjectsList";
import Contact from "../components/Contact";
import Header from "../components/Header";
import D3Wrapper from "../components/D3Wrapper";

// Portfolio contains header, aside, projects
const Portfolio = styled.div`
  --black: #272727;
  --opac: 99;
  /* background: var(--black); */
  background-image: url("https://image.ibb.co/eUQPcK/ep_naturalblack.png"); /* fallback */
  background-image: radial-gradient(
      circle at center 50vh,
      #02418980,
      #04367380,
      #052c5d80,
      #06224880,
      #06183480
    ),
    url("https://image.ibb.co/eUQPcK/ep_naturalblack.png");

  display: grid;

  grid-template-rows: 100vh 200vh 100vh;
  grid-template-areas: "intro" "projects" "contact";

  grid-template-columns: 1fr;

  .header {
    width: 100%;
    grid-area: "intro";
  }
`;

const GridLeftRight = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 250px 1fr;
  .gridVerticalSimulation {
    display: grid;
    grid-template-rows: 200vh;
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
    // start the simulation after the sidenav transitions in
    document
      .querySelector("aside")
      .addEventListener("transitionend", this.handleTransitionend, {
        once: true,
      });
  };

  handleScroll = () => {
    const scrollFraction = window.pageYOffset / window.innerHeight;

    // warp hero
    if (scrollFraction >= 0 && scrollFraction <= 1) {
      this.warpHero(scrollFraction);
    }

    // pop-up sidenav at scroll ~ 0.75
    if (scrollFraction >= 1 && scrollFraction < 2) {
      !this.state.popup && this.setState({ popup: true });
    } else {
      this.state.popup && this.setState({ popup: false });
    }

    // detect scroll direction
    const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > this.state.lastScrollTop) {
      document.getElementById("hero").classList.remove("scrollingUp");
    } else {
      document.getElementById("hero").classList.add("scrollingUp");
    }
    this.setState({ lastScrollTop: st <= 0 ? 0 : st }); // For Mobile or negative scrolling
  };

  handleTransitionend = () => {
    this.setState({ simStart: true });
    document.querySelector(".latestWorkTitle").classList.add("simStart");
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
    const { data, scrollFraction } = this.props;
    const { nodes, popup, simStart } = this.state;

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

          <div className="gridVerticalSimulation">
            <D3Wrapper nodes={nodes} simStart={simStart} />

            <Contact className="contact" />
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
