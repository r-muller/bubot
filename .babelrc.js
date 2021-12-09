module.exports = function (api) {
	api.cache(true);
	return {
		"presets": [
			[
				"@babel/preset-env",
				{
					"targets": {
						"node": "current"
					}
				}
			],
			/*
			[
				"@babel/preset-react",
				{
					"runtime": "classic",
					"pragma": "JSX",
					"pragmaFrag": "JSXF",
					"throwIfNamespace": false
				}
			],
			[
				"@babel/preset-typescript",
				{
					"isTSX": true,
					"allExtensions": true,
					"allowNamespaces": true,
					"allowDeclareFields": true,
					"jsxPragma": "JSX"
				}
			]
			*/
		],
		"plugins": [
			/*
			[
				"babel-plugin-closure-elimination",
				{}
			],
			[
				"@babel/plugin-proposal-decorators",
				{
					"legacy": true
				}
			],
			*/
			[
				"@babel/plugin-proposal-class-properties",
				{
					"loose": true
				}
			],
			/*
			[
				"contracts",
				{
					"assert": "assert",
					"precondition": "pre",
					"postcondition": "post",
					"invariant": "invariant",
					"return": "it",
					"old": "old"
				}
			]
			*/
		]
	};
}