const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = (eleventyConfig) => {
    const options = {
        html: true,
        breaks: true,
        linkify: true,
    };
    const markdownLib = markdownIt(options).use(markdownItAttrs);
    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy('./src/*.css');
    eleventyConfig.addPassthroughCopy('./src/js');

    eleventyConfig.addWatchTarget('./src/js/');

    eleventyConfig.addGlobalData('env', require('dotenv').config().parsed);

    eleventyConfig.addFilter('limit', (arr, limit) => arr.slice(0, limit));

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
