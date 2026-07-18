import markdownIt from "markdown-it";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import readingTime from "eleventy-plugin-reading-time";
import githubRepos from "eleventy-plugin-github-repos";
import eleventyAutoCacheBuster from "eleventy-auto-cache-buster";
import poison from "eleventy-plugin-poison";

export default function (eleventyConfig) {
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.setOutputDirectory("dist");
	eleventyConfig.setIncludesDirectory("_includes");
	eleventyConfig.setLayoutsDirectory("_layouts");

	eleventyConfig.addPassthroughCopy("src/**/*.css");
	eleventyConfig.addPassthroughCopy("src/**/*.js");
	eleventyConfig.addPassthroughCopy("src/**/*.{png,jpg,jpeg,mp4}");

	let options = {
		html: true,
		breaks: true,
		linkify: true,
	};

	eleventyConfig.setLibrary("md", markdownIt(options));
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"));

	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/rss.xml",
		collection: {
			name: "posts",
			limit: 0,
		},
		metadata: {
			language: "en",
			title: "ux | blogs",
			subtitle: "ramblings",
			base: "https://kthread.dev",
			author: {
				name: "uxtbd",
				email: "dev@kthread.dev",
			},
		},
	});
	eleventyConfig.addPlugin(readingTime);
	eleventyConfig.addPlugin(githubRepos, { userAccount: "uxtbd" });
}
