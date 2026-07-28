import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.{js,mjs,cjs}"],
		rules: {
			"no-unused-vars": "warn",
			"no-console": "off",
		},
	},
	eslintConfigPrettier,
];
