let mix = require('laravel-mix');

const modifyVars = {

}

mix.less('src/index.less', 'dist', {
  lessOptions: {
    javascriptEnabled: true,
    modifyVars: modifyVars,
  }
});

mix.js('src/index.js', 'dist', {
  lessOptions: {
    javascriptEnabled: true,
    modifyVars: modifyVars,
  }
});