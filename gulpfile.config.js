const path = require('path');

module.exports = {
  server: {
    serveFolder: path.join(__dirname, 'www'),
    assets: path.join(__dirname, 'www/assets'),
    host: '192.168.1.130',
    port: 3000,
  },
  paths: {
    styles: path.join(__dirname, 'src/styles/'),
    stylesSvgSprite: path.join(__dirname, 'src/styles/svg-sprite/'),
    stylesAll: path.join(__dirname, 'src/styles/**/*.scss'),
    stylesBase: path.join(__dirname, 'src/styles/base.scss'),
    stylesSvg: path.join(__dirname, 'src/styles/svg.scss'),
    scripts: path.join(__dirname, 'src/scripts/**/*.js'),
    pages: path.join(__dirname, 'src/pages/**/*.+(html|njk)'),
    icons: path.join(__dirname, 'src/assets/icons/*.svg'),
    svgTemplate: path.join(__dirname, 'src/templates/svg-sprite.mustache'),
    svgLayoutTemplate: path.join(__dirname, 'src/templates/svg-sprite-layout.svg'),
    svgDefs: path.join(__dirname, 'src/assets/defs.svg'),
    svgStylesTemplate: path.join(__dirname, 'src/templates/svg-sprite-styles.svg'),
  }
};
