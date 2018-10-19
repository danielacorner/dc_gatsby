import React, { Component } from "react";
import styled from "styled-components";
// import { withStyles } from "@material-ui/core";
import ProjectsList from "./ProjectsList";
import ProjectsListMobile from "./ProjectsListMobile";
import Contact from "./Contact";
import Header from "./Header";
import D3Wrapper from "./D3Wrapper";
import Navbar from "./Navbar";

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

  /* grid-template-rows: header title works contact; */
  grid-template-rows:
    minmax(1400px, 135vh) minmax(90px, 10vh) minmax(1333px, 150vh)
    minmax(888px, 100vh);
  @media (max-width: 481px) {
    grid-template-rows:
      minmax(1400px, 135vh) minmax(90px, 10vh) auto
      minmax(888px, 100vh);
  }

  grid-template-columns: 1fr;
  #hero {
    opacity: 0;
    animation: fadeIn 2s;
    opacity: 1;
  }
  .header {
    width: 100%;
  }
  #projectsListMobile {
    transition: all 0.25s cubic-bezier(0.4, 0.56, 0.11, 0.96);
    &.swoosh {
      transform: translateX(-20px);
      opacity: 0;
    }
  }
`;

const LatestWorkTitle = styled.h2`
  transition: opacity 0.5s;
  margin: 0 auto;
  padding: 30px 0;
  color: #ffca2d;
  font-family: "Oxygen Mono", monospace;
  font-size: 20px;
  @media (min-width: 800px) {
    font-size: 24px;
  }
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
  &.swoosh {
    transition: all 0.25s ease-in;
    transform: translateX(-20px);
    opacity: 0;
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
    isMobile: false,
  };

  getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
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

  throttledHandleWindowResize = () => {
    // _.throttle(() => {
    this.setState({ isMobile: window.innerWidth <= 480 });
    // }, 200);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.throttledHandleWindowResize);
    window.removeEventListener("transitionend", this.handleTransitionend);
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.throttledHandleWindowResize);
    this.throttledHandleWindowResize();
    // check scroll height if navigating to page already-scrolled
    this.handleScroll();

    // start the simulation after the sidenav transitions in
    document
      .querySelector("aside")
      .addEventListener("transitionend", this.handleTransitionend, {
        once: true,
      });

    // if navigating from project page, scroll back to projects grid
    const previousUrl = this.getCookie("previousUrl");

    previousUrl !== "" &&
      setTimeout(() => {
        const listRoot = document.querySelector(".listRoot");
        listRoot.style.animation =
          "swooshInRight 0.25s cubic-bezier(0.26, 1.02, 0.98, 0.94)";
        listRoot.scrollIntoView();
        // start simulation
        this.handleTransitionend();
      }, 0);
    // clear cookie (to only scroll after navigating back from project)
    document.cookie = `previousUrl=; path=/;`;
  };

  handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    const sf = scrollPosition / window.innerHeight;

    const latestWorkTitle = document
      .querySelector(".latestWorkTitle")
      .getBoundingClientRect();

    // warp hero
    if (sf >= 0 && latestWorkTitle.top > 0) {
      // only on tablet+
      if (window.innerWidth > 480) {
        this.warpHero(sf);
      }
    }

    // reveal interests
    if (sf > 0.1) {
      document.getElementById("interests").classList.add("revealed");
    } else {
      document.getElementById("interests").classList.remove("revealed");
    }
    if (sf > 0.3) {
      document.getElementById("interest1").classList.add("revealed");
    } else {
      document.getElementById("interest1").classList.remove("revealed");
    }
    if (sf > 0.5) {
      document.getElementById("interest2").classList.add("revealed");
    } else {
      document.getElementById("interest2").classList.remove("revealed");
    }
    if (sf > 0.7) {
      document.getElementById("interest3").classList.add("revealed");
    } else {
      document.getElementById("interest3").classList.remove("revealed");
    }

    // show latest work title when it's above 1/3 height
    if (latestWorkTitle.top < window.innerHeight / 3) {
      document.querySelector(".latestWorkTitle").classList.add("simStart");
    } else {
      document.querySelector(".latestWorkTitle").classList.remove("simStart");
    }

    // pop-up sidenav at scroll ~ 0.75
    const aside = document.querySelector("aside").getBoundingClientRect();

    if (aside.top < 200 && aside.top > -500) {
      !this.state.popup && this.setState({ popup: true });
    } else {
      this.state.popup && this.setState({ popup: false });
    }

    // detect scroll direction
    // const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    // if (st > this.state.lastScrollTop) {
    //   document.getElementById("hero") &&
    //     document.getElementById("hero").classList.remove("scrollingUp");
    // } else {
    //   document.getElementById("hero") &&
    //     document.getElementById("hero").classList.add("scrollingUp");
    // }
    // this.setState({ lastScrollTop: st <= 0 ? 0 : st }); // For Mobile or negative scrolling
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
    if (intro && intro.parentElement.style.perspective !== "500px") {
      window.requestAnimationFrame(() => {
        intro.parentElement.style.perspective = `500px`;
      });
    }
  };

  handleExpandProjectListItem = d => {
    const opened = document.querySelector(".open");
    opened && opened.classList.remove("open");

    document.querySelector(`#listItem_${d.id}`).classList.add("open");

    this.setState({ visibleButtonsID: d.id });
  };

  render() {
    const { data, scrollFraction } = this.props;
    const { nodes, popup, simStart, visibleButtonsID, isMobile } = this.state;

    const projects = data.allMarkdownRemark.edges
      .map(p => p.node)
      .sort((a, b) => a.frontmatter.year < b.frontmatter.year);

    return (
      <Portfolio>
        <EarthIMG src="https://image.ibb.co/ehP91e/earth_crop_burned.png" />
        {/* contains: header, aside, projects */}
        <div>
          <Navbar />
          <Header className={"header"} popup={popup} />
        </div>

        <LatestWorkTitle className="latestWorkTitle">
          Here's what I've been working on:
        </LatestWorkTitle>

        {!isMobile && (
          <GridLeftRight id="projectsGrid"
            style={{pointerEvents: popup ? 'auto' : 'none'}}
          >
            {/* sticky projects list aside (left on desktop, bottom on mobile) */}
            <ProjectsList
              popup={popup}
              projects={projects}
              visibleButtonsID={visibleButtonsID}
              onClickListItem={d => this.handleExpandProjectListItem(d)}
            />

            <div className="gridVerticalSimulation">
              <D3Wrapper
                onNodeClick={d => {
                  this.handleExpandProjectListItem(d);
                }}
                nodes={nodes}
                simStart={simStart}
              />
            </div>
          </GridLeftRight>
        )}
        {isMobile && <ProjectsListMobile popup={popup} projects={projects} />}
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
