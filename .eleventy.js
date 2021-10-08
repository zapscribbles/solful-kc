const htmlmin = require('html-minifier');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

const now = String(Date.now());

module.exports = function (eleventyConfig) {
    var accentColourTracker = 0;
    function incrementAccentTracker() {
        accentColourTracker++;
        accentColourTracker > 2 ? (accentColourTracker = 0) : null;
    }

    eleventyConfig.setUseGitIgnore(false);

    // Add plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Setup files
    eleventyConfig.addWatchTarget('./_tmp/style.css');
    eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './css/style.css' });
    eleventyConfig.addPassthroughCopy({ 'src/styles/logo-style.css': './css/logo-style.css' });
    eleventyConfig.addPassthroughCopy('src/common-js/*.js');
    eleventyConfig.addPassthroughCopy('src/**/*.js');
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('admin');
    // eleventyConfig.addPassthroughCopy('services');

    // This adds a variable that can be used in the template. In this case, we use build time to identify the current version of the site
    eleventyConfig.addShortcode('version', function () {
        return now;
    });
    eleventyConfig.addShortcode('versionDate', function () {
        return Date(now);
    });

    eleventyConfig.addNunjucksShortcode('accent', function () {
        var output = `<i class="fad fa-tree-palm accent accent-${accentColourTracker}"></i>`;
        incrementAccentTracker();
        return output;
    });

    eleventyConfig.addPairedNunjucksShortcode('imageAppearEffect', function (imageURL) {
        // Slide in
        //     return `<div x-data="{ show: false }" x-intersect="show = true" class="overflow-hidden">
        //     <img class="transition-all delay-150 duration-700 transform" :class="show ? 'translate-x-0 opacity-100' : 'translate-x-3/4 opacity-0'" src="${imageURL}"/>
        // </div>`;
        // Scale in
        return `<div x-data="{ show: false }" x-intersect="show = true" class="overflow-hidden">
            <img class="transition-all delay-150 duration-500 transform" :class="show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'" src="${imageURL}"/>
        </div>`;
    });

    eleventyConfig.addPairedNunjucksShortcode('threeDShadow', function (content) {
        var output = `<div x-data="{ show: false }" x-intersect="show = true">
            <div class="transition-all delay-300 duration-700" :class="show ? 'three-d-shadow three-d-shadow-${accentColourTracker}' : ''">
                ${content}
            </div>
        </div>`;
        incrementAccentTracker();
        return output;
    });

    eleventyConfig.addFilter('log', value => {
        console.log(value);
    });
    eleventyConfig.addNunjucksFilter('arrayElemsAsVars', function (array) {
        var output = '';
        array.forEach((element, i, arr) => {
            output += element;
            if (i + 1 < arr.length) {
                output += ', ';
            }
        });
        return output;
    });
    eleventyConfig.addNunjucksFilter('arrayElemsAsStrs', function (array) {
        var output = '';
        array.forEach((element, i, arr) => {
            output += "'" + element + "'";
            if (i + 1 < arr.length) {
                output += ', ';
            }
        });
        return output;
    });

    // If being deployed (build rather than start), minify everything
    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
        if (process.env.ELEVENTY_PRODUCTION && outputPath && outputPath.endsWith('.html')) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
            return minified;
        }
        return content;
    });

    return {
        dir: {
            input: 'src',
            layouts: '_includes/layouts',
            output: '_site',
        },
    };
};
