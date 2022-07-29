module.exports = (eleventyConfig) => {
    eleventyConfig.addPassthroughCopy('./src/*.css');
    eleventyConfig.addPassthroughCopy('./src/js');

    eleventyConfig.addWatchTarget('./src/js/');

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
