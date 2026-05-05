module.exports = {
	globDirectory: 'utils',
	globPatterns: [
		'**/*.ts'
	],
	swDest: 'utils/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};