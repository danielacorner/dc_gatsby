import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Link from "gatsby-link";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = {
  listRoot: {
    display: "grid",
  },
  listSection: {
    display: "grid",
  },
  ul: {
    margin: 0,
    display: "grid",
  },
  subheader: {
    paddingLeft: "0px",
    marginBottom: "5px",
    height: "22px",
    margin: 0,
  },
  listItem: {
    margin: 0,
    display: "grid",
  },
  projectLink: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "underline",
      backgroundColor: "hsl(0, 0%, 95%)",
    },
  },
};

class ProjectsList extends Component {
  render() {
    const { projects, classes } = this.props;

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    const years = projects.map(p => p.frontmatter.year).filter(onlyUnique);

    return (
      <List className={classes.listRoot} subheader={<li />}>
        {/* for each year, add a header, then map over that year's projects */}
        {years.map(year => {
          return (
            <li key={"sticky-" + year} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader className={classes.subheader}>
                  {year}
                </ListSubheader>
                {projects
                  .filter(project => project.frontmatter.year === year)
                  .map(project => (
                    <ListItem className={classes.listItem} key={project.id}>
                      <Link
                        className={classes.projectLink}
                        to={project.frontmatter.path}
                      >
                        {project.frontmatter.title}
                      </Link>
                      <Typography variant="caption">
                        {project.frontmatter.tools.join(" | ")}
                      </Typography>
                    </ListItem>
                  ))}
              </ul>
            </li>
          );
        })}
      </List>
    );
  }
}

export default withStyles(styles)(ProjectsList);
