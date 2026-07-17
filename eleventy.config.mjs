import markdownIt from "markdown-it";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.setOutputDirectory("dist");
	eleventyConfig.setIncludesDirectory("_includes");
	eleventyConfig.setLayoutsDirectory("_layouts");

	let options = {
		html: true,
		breaks: true,
		linkify: true,
	};

	eleventyConfig.addPlugin(syntaxHighlight);

	eleventyConfig.setLibrary("md", markdownIt(options));
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"));

};
