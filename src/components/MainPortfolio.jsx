import React, { Component } from "react";
import styled from "styled-components";
// import { withStyles } from "@material-ui/core";
import ProjectsList from "./ProjectsList";
import Contact from "./Contact";
import Header from "./Header";
import D3Wrapper from "./D3Wrapper";
import _ from "lodash";

// Portfolio contains header, aside, projects
const Portfolio = styled.div`
  /* overflow-x: hidden; */
  margin-bottom: -4px;
  position: relative;
  --black: #272727;
  --opac: 99;
  /* background: var(--black); */
  background-image: url("https://image.ibb.co/eUQPcK/ep_naturalblack.png"); /* fallback */
  background-image: radial-gradient(
      circle at center 50vh,
      #02418980,
      #04367373,
      #052c5d66,
      #06224859,
      #0618344d
    ),
    url("https://image.ibb.co/eUQPcK/ep_naturalblack.png");

  display: grid;

  grid-template-rows: 115vh 10vh 150vh 100vh;

  grid-template-columns: 1fr;

  .header {
    width: 100%;
  }
`;

const LatestWorkTitle = styled.h2`
  margin: 0 auto;
  padding: 20px 0;
  color: #ffca2d;
  font-family: "Oxygen Mono", monospace;
  align-self: end;
  opacity: 0;
  &.simStart {
    animation: transitionUp 0.5s, fadeIn 0.5s;
    opacity: 1;
  }
`;

const GridLeftRight = styled.div`
  height: 100%;
  width: 100vw;
  display: grid;
  grid-template-columns: 250px 1fr;
  @media (max-width: 540px) {
    grid-template-columns: 200px 1fr;
  }
  .gridVerticalSimulation {
    display: grid;
    grid-template-rows: 200vh;
  }
  .gatsby {
    position: absolute;
    bottom: 10;
    left: 10;
  }
`;

const EarthIMG = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin: 0;
  opacity: 0.6;
  filter: drop-shadow(0px -8px 15px rgba(150, 230, 255, 0.7));
`;

const Projects = styled.main``;

export default class MainPortfolio extends Component {
  state = {
    nodes: null,
    links: null,
    popup: false,
    lastScrollTop: 0,
    visibleButtonsID: null,
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
  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };

  componentDidMount = () => {
    console.log("scrolling", this.state.scrollToProjects);
    this.state.scrollToProjects &&
      window.scrollTo(document.querySelector("aside").offsetTop);

    window.addEventListener("scroll", this.handleScroll);
    // window.addEventListener("scroll", window.requestAnimationFrame(this.handleScroll));

    // check scroll height if navigating to page already-scrolled
    this.handleScroll();

    // start the simulation after the sidenav transitions in
    document
      .querySelector("aside")
      .addEventListener("transitionend", this.handleTransitionend, {
        once: true,
      });
  };

  handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    const sf = scrollPosition / window.innerHeight;

    // warp hero
    if (sf >= 0 && sf <= 1) {
      this.warpHero(sf);
    }

    // reveal interests
    if (sf > 0.1) {
      document.getElementById("interests").classList.add("revealed");
    }
    if (sf > 0.3) {
      document.getElementById("interest1").classList.add("revealed");
    }
    if (sf > 0.5) {
      document.getElementById("interest2").classList.add("revealed");
    }
    if (sf > 0.7) {
      document.getElementById("interest3").classList.add("revealed");
    }
    if (sf > 1) {
      document.querySelector(".latestWorkTitle").classList.add("simStart");
    }

    // pop-up sidenav at scroll ~ 0.75
    if (sf >= 1.2 && sf < 1.7) {
      !this.state.popup && this.setState({ popup: true });
    } else {
      this.state.popup && this.setState({ popup: false });
    }

    // detect scroll direction
    const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > this.state.lastScrollTop) {
      document.getElementById("hero") &&
        document.getElementById("hero").classList.remove("scrollingUp");
    } else {
      document.getElementById("hero") &&
        document.getElementById("hero").classList.add("scrollingUp");
    }
    this.setState({ lastScrollTop: st <= 0 ? 0 : st }); // For Mobile or negative scrolling
  };

  handleTransitionend = () => {
    this.setState({ simStart: true });
  };

  warpHero = sf => {
    const heroImg = document.querySelector("#avatar");
    const intro = document.querySelector("header div");

    // scale out and rotate into the page
    window.requestAnimationFrame(
      () =>
        (intro.style.transform = `translateY(${-sf *
          window.innerHeight *
          0.5}px) rotateX(${sf * 90 > 30 ? 30 : sf * 90}deg) translateZ(${-sf *
          window.innerHeight *
          0.5}px)`)
    );

    window.requestAnimationFrame(
      () =>
        (heroImg.style.transform = `rotateX(${sf * 90 > 30 ? 30 : sf * 90}deg)`)
    );

    // perspective for header container
    // todo: increase perspective for mobile width
    if (intro && intro.parentElement.style.perspective !== "500px") {
      window.requestAnimationFrame(() => {
        intro.parentElement.style.perspective = `500px`;
      });
    }
  };

  handleChangeVisibility = id => {
    this.setState({ visibleButtonsID: id });
  };

  render() {
    const { data, scrollFraction } = this.props;
    const { nodes, popup, simStart, visibleButtonsID } = this.state;

    const projects = data.allMarkdownRemark.edges
      .map(p => p.node)
      .sort((a, b) => a.frontmatter.year < b.frontmatter.year);

    return (
      <Portfolio>
        <EarthIMG src="https://image.ibb.co/ehP91e/earth_crop_burned.png" />
        {/* contains: header, aside, projects */}
        {/* header */}
        <Header className={"header"} popup={popup} />

        <LatestWorkTitle className="latestWorkTitle">
          Some of my latest work...
        </LatestWorkTitle>

        <GridLeftRight>
          {/* sticky projects list aside (left on desktop, bottom on mobile) */}
          <ProjectsList
            popup={popup}
            projects={projects}
            visibleButtonsID={visibleButtonsID}
            onChangeVisibility={id => this.handleChangeVisibility(id)}
          />

          <div className="gridVerticalSimulation">
            <D3Wrapper
              onNodeClick={id => this.handleChangeVisibility(id)}
              nodes={nodes}
              simStart={simStart}
            />
          </div>
        </GridLeftRight>
        <Contact className="contact" />
      </Portfolio>
    );
  }
}

// export const pageQuery = graphql`
//   query IndexQuery {
//     allMarkdownRemark {
//       edges {
//         node {
//           id
//           frontmatter {
//             id
//             title
//             caption
//             year
//             path
//             radius
//             tools
//             image
//             imgThumb
//             website
//           }
//         }
//       }
//     }
//   }
// `;
