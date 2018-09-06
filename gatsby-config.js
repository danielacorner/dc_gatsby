module.exports = {
  siteMetadata: {
    title: 'Daniel Corner',
  },
  plugins: ['gatsby-plugin-react-helmet',
'gatsby-plugin-styled-components',
{
  resolve: 'gatsby-source-filesystem',
  options: {
    path: `${__dirname}/src/pages`,
    name: 'pages'
  }
}
],
}
