/** @type {import("prettier").Config} */
export default {
	plugins: ["prettier-plugin-nunjucks"],
	experimentalTernaries: true,
	experimentalOperatorPosition: "start",
	tabWidth: 4,
	useTabs: true,
	singleQuote: false,
	quoteProps: "consistent",
	trailingComma: "all",
	proseWrap: "never",
	overrides: [
		{
			files: ["*.njk", "*.nunjucks", "*.nunj"],
			options: {
				parser: "nunjucks",
			},
		},
	],
};
