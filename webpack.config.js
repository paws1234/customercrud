const mix = require('laravel-mix');
const path = require('path');

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .setPublicPath('public');
