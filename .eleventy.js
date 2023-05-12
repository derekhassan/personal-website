const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const Image = require('@11ty/eleventy-img');

module.exports = (eleventyConfig) => {
    const options = {
        html: true,
        breaks: true,
        linkify: true,
    };
    const markdownLib = markdownIt(options).use(markdownItAttrs);
    markdownLib.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const imgSrc = token.attrGet('src');
        const imgAlt = token.content;

        const htmlOpts = {
            alt: imgAlt,
            loading: 'lazy',
            decoding: 'async',
        };

        if (imgSrc.startsWith('/assets')) {
            imgSrc = 'src' + imgSrc;
        }

        const widths = [250, 316, 426, 460, 580, 600, 1000];
        const imgOpts = {
            widths: widths
                .concat(widths.map((w) => w * 2)) // generate 2x sizes
                .filter((v, i, s) => s.indexOf(v) === i), // dedupe
            formats: ['avif', 'webp', 'jpeg'],
            urlPath: '/assets/img/',
            outputDir: './dist/assets/img/',
        };

        Image(imgSrc, imgOpts);
        const metadata = Image.statsSync(imgSrc, imgOpts);

        const generated = Image.generateHTML(metadata, {
            sizes: '(max-width: 400px) 250px',
            ...htmlOpts,
        });

        return generated;
    };
    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy('./src/*.css');
    eleventyConfig.addPassthroughCopy('./src/js');

    eleventyConfig.addWatchTarget('./src/js/');

    eleventyConfig.addGlobalData('env', require('dotenv').config().parsed);

    eleventyConfig.addFilter('limit', (arr, limit) => arr.slice(0, limit));

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: '--excerpt--',
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
