import React from "react";
import Link from "gatsby-link";

const Header = ({ siteTitle }) => (
  <header
    className="siteHeader"
    style={{
      gridArea: "header",
      background: "#333",
      marginBottom: "1.45rem",
    }}
  >
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "1.45rem 1.0875rem",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
