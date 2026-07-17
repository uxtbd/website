import markdownIt from "markdown-it";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import readingTime from "eleventy-plugin-reading-time";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_layouts");

  eleventyConfig.addPassthroughCopy("src/**.css"); // CSS files
  eleventyConfig.addPassthroughCopy("src/scripts/*.js"); // JavaScript files
  eleventyConfig.addPassthroughCopy("src/assets/**/*.{png,jpg,mp4}"); // Media files

  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  
  eleventyConfig.setLibrary("md", markdownIt(options));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"));

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/rss.xml",
		collection: {
			name: "blogs", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "ux | blogs",
			subtitle: "ramblings",
			base: "https://kthread.dev",
			author: {
				name: "uxtbd",
				email: "dev@kthread.dev",
			}
		}
	});
	eleventyConfig.addPlugin(readingTime);
}
