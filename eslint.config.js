const globals = require("globals")

const unicorn = require("eslint-plugin-unicorn")
const sonarjs = require("eslint-plugin-sonarjs")
const stylistic = require("@stylistic/eslint-plugin-js")
const htmlESLint = require("@html-eslint/eslint-plugin")
const html = require("eslint-plugin-html")

const linterOptions = {
	reportUnusedDisableDirectives: "error"
}
const global = {
	...globals.browser,

	encode: "writable",
	assertInt: "writable",
	get: "writable",
	getLanguage: "writable",
	getCookie: "writable",
	setCookie: "writable",
	deleteCookie: "writable",
	reloadText: "writable",
	handleError: "writable",
	handleChange: "writable",
	pickerData: "writable",
	selectData: "writable",
	messageData: "writable",
	openDialog: "writable",
	fadeIn: "writable",
	fadeOut: "writable",
	ToastNotification: "writable",
	sockette: "writable",
	mentionPicker: "writable",
	emojiPicker: "writable",
	sidebar: "writable",
	updateSelected: "writable",
	togglePicker: "writable",
	handleClickAndEnter: "writable",

	renderImage: "readonly",
	turnstile: "readonly",
	Chart: "readonly"
}

const rules = {
	"accessor-pairs": 2,
	"array-callback-return": 2,
	"block-scoped-var": 2,
	"default-case-last": 2,
	"default-param-last": 2,
	"dot-notation": 2,
	"func-name-matching": 2,
	"func-style": 2,
	"no-array-constructor": 2,
	"no-compare-neg-zero": 2,
	"no-const-assign": 2,
	"no-constructor-return": 2,
	"no-div-regex": 2,
	"no-dupe-args": 2,
	"no-dupe-keys": 2,
	"no-duplicate-case": 2,
	"no-duplicate-imports": 2,
	"no-empty-pattern": 2,
	"no-eq-null": 2,
	"no-extend-native": 2,
	"no-extra-bind": 2,
	"no-extra-boolean-cast": [2, { enforceForInnerExpressions: true }],
	"no-fallthrough": 2,
	"no-func-assign": 2,
	"no-import-assign": 2,
	"no-implied-eval": 2,
	"no-implicit-coercion": [2, { string: false }],
	"no-invalid-regexp": 2,
	"no-invalid-this": 2,
	"no-irregular-whitespace": [2, { skipRegExps: true }],
	"no-loss-of-precision": 2,
	"no-lone-blocks": 2,
	"no-multi-assign": 2,
	"no-multi-str": 2,
	"no-negated-condition": 2,
	"no-new-func": 2,
	"no-new-native-nonconstructor": 2,
	"no-new-object": 2,
	"no-new-wrappers": 2,
	"no-obj-calls": 2,
	"no-promise-executor-return": 2,
	"no-redeclare": 2,
	"no-regex-spaces": 2,
	"no-self-assign": 2,
	"no-self-compare": 2,
	"no-sequences": 2,
	"no-shadow": [2, { builtinGlobals: false }],
	"no-shadow-restricted-names": 2,
	"no-template-curly-in-string": 2,
	"no-throw-literal": 2,
	"no-unmodified-loop-condition": 2,
	"no-unneeded-ternary": 2,
	"no-unreachable": 2,
	"no-unreachable-loop": 2,
	"no-unsafe-finally": 2,
	"no-unsafe-negation": 2,
	"no-unsafe-optional-chaining": 2,
	"no-unused-expressions": 2,
	"no-unused-vars": 1,
	"no-use-before-define": [2, { functions: false }],
	"no-useless-backreference": 2,
	"no-useless-call": 2,
	"no-useless-catch": 2,
	"no-undef": [2, {
		typeof: true
	}],
	"no-undef-init": 2,
	"no-useless-computed-key": 2,
	"no-useless-concat": 2,
	"no-useless-constructor": 2,
	"no-empty-static-block": 2,
	"no-useless-escape": 2,
	"no-useless-rename": 2,
	"no-useless-return": 2,
	"no-var": 2,
	"no-constant-binary-expression": 2,
	"no-constant-condition": 2,
	"no-undefined": 2,
	"no-warning-comments": 2,
	"object-shorthand": 2,
	"prefer-arrow-callback": 2,
	"prefer-const": 2,
	"prefer-object-spread": 2,
	"use-isnan": 2,
	"valid-typeof": 2,
	yoda: 2,

	"@stylistic/js/array-bracket-spacing": 2,
	"@stylistic/js/arrow-parens": [2, "as-needed"],
	"@stylistic/js/arrow-spacing": 2,
	"@stylistic/js/block-spacing": [2, "never"],
	"@stylistic/js/brace-style": 2,
	"@stylistic/js/comma-dangle": 2,
	"@stylistic/js/comma-style": 2,
	"@stylistic/js/computed-property-spacing": 2,
	"@stylistic/js/dot-location": [2, "property"],
	"@stylistic/js/function-call-spacing": 2,
	"@stylistic/js/generator-star-spacing": 2,
	"@stylistic/js/key-spacing": 2,
	"@stylistic/js/keyword-spacing": 2,
	"@stylistic/js/max-len": [2, { code: 200 }],
	"@stylistic/js/max-statements-per-line": 2,
	"@stylistic/js/new-parens": 2,
	"@stylistic/js/no-extra-semi": 2,
	"@stylistic/js/no-floating-decimal": 2,
	"@stylistic/js/no-mixed-operators": [2, { groups: [["*", "/"], ["+", "-"]] }],
	"@stylistic/js/no-mixed-spaces-and-tabs": 2,
	"@stylistic/js/no-multi-spaces": 2,
	"@stylistic/js/no-multiple-empty-lines": 2,
	"@stylistic/js/no-trailing-spaces": 2,
	"@stylistic/js/no-whitespace-before-property": 2,
	"@stylistic/js/padded-blocks": [2, "never"],
	"@stylistic/js/quote-props": [2, "as-needed"],
	"@stylistic/js/quotes": [2, "double", { allowTemplateLiterals: false, avoidEscape: false }],
	"@stylistic/js/rest-spread-spacing": 2,
	"@stylistic/js/semi": [2, "never"],
	"@stylistic/js/space-before-blocks": 2,
	"@stylistic/js/space-before-function-paren": [2, { named: "never", anonymous: "never", asyncArrow: "always" }],
	"@stylistic/js/space-in-parens": 2,
	"@stylistic/js/space-infix-ops": 2,
	"@stylistic/js/space-unary-ops": 2,
	"@stylistic/js/yield-star-spacing": 2,

	"unicorn/catch-error-name": [2, {
		name: "e",
		ignore: [
			"err",
			"error",
			/^\w+Error$/
		]
	}],
	"unicorn/consistent-destructuring": 2,
	"unicorn/consistent-empty-array-spread": 2,
	"unicorn/consistent-function-scoping": 2,
	"unicorn/empty-brace-spaces": 2,
	"unicorn/error-message": 2,
	"unicorn/new-for-builtins": 2,
	"unicorn/no-array-method-this-argument": 2,
	"unicorn/no-await-in-promise-methods": 2,
	"unicorn/no-console-spaces": 2,
	"unicorn/no-for-loop": 2,
	"unicorn/no-instanceof-array": 2,
	"unicorn/no-invalid-fetch-options": 2,
	"unicorn/no-length-as-slice-end": 2,
	"unicorn/no-lonely-if": 2,
	"unicorn/no-magic-array-flat-depth": 2,
	"unicorn/no-negation-in-equality-check": 2,
	"unicorn/no-nested-ternary": 2,
	"unicorn/no-new-buffer": 2,
	"unicorn/no-single-promise-in-promise-methods": 2,
	"unicorn/no-typeof-undefined": 2,
	"unicorn/no-unnecessary-await": 2,
	"unicorn/no-unreadable-array-destructuring": 2,
	"unicorn/no-unreadable-iife": 2,
	"unicorn/no-useless-fallback-in-spread": 2,
	"unicorn/no-useless-length-check": 2,
	"unicorn/no-useless-promise-resolve-reject": 2,
	"unicorn/no-useless-spread": 2,
	"unicorn/no-useless-switch-case": 2,
	"unicorn/no-useless-undefined": 2,
	"unicorn/no-zero-fractions": 2,
	"unicorn/prefer-array-find": 2,
	"unicorn/prefer-array-index-of": 2,
	"unicorn/prefer-array-some": 2,
	"unicorn/prefer-at": 2,
	"unicorn/prefer-blob-reading-methods": 2,
	"unicorn/prefer-date-now": 2,
	"unicorn/prefer-default-parameters": 2,
	"unicorn/prefer-includes": 2,
	"unicorn/prefer-keyboard-event-key": 2,
	"unicorn/prefer-logical-operator-over-ternary": 2,
	"unicorn/prefer-negative-index": 2,
	"unicorn/prefer-node-protocol": 2,
	"unicorn/prefer-number-properties": [1, { checkInfinity: true }],
	"unicorn/prefer-optional-catch-binding": 2,
	"unicorn/prefer-prototype-methods": 2,
	"unicorn/prefer-regexp-test": 2,
	"unicorn/prefer-set-has": 2,
	"unicorn/prefer-set-size": 2,
	"unicorn/prefer-string-starts-ends-with": 2,
	"unicorn/prefer-string-trim-start-end": 2,
	"unicorn/prefer-structured-clone": 2,
	"unicorn/require-number-to-fixed-digits-argument": 2,
	"unicorn/switch-case-braces": [2, "avoid"],
	"unicorn/text-encoding-identifier-case": 2,
	"unicorn/throw-new-error": 2,

	"sonarjs/array-callback-without-return": 2,
	"sonarjs/array-constructor": 2,
	"sonarjs/bitwise-operators": 2,
	"sonarjs/bool-param-default": 2,
	"sonarjs/call-argument-line": 2,
	"sonarjs/chai-determinate-assertion": 2,
	"sonarjs/class-prototype": 2,
	"sonarjs/comma-or-logical-or-case": 2,
	"sonarjs/concise-regex": 2,
	"sonarjs/declarations-in-global-scope": 2,
	"sonarjs/deprecation": 2,
	"sonarjs/disabled-auto-escaping": 2,
	"sonarjs/duplicates-in-character-class": 2,
	"sonarjs/empty-string-repetition": 2,
	"sonarjs/existing-groups": 2,
	"sonarjs/file-name-differ-from-class": 2,
	"sonarjs/for-in": 2,
	"sonarjs/for-loop-increment-sign": 2,
	"sonarjs/function-inside-loop": 2,
	"sonarjs/future-reserved-words": 2,
	"sonarjs/generator-without-yield": 2,
	"sonarjs/hidden-files": 2,
	"sonarjs/in-operator-type-error": 2,
	"sonarjs/inconsistent-function-call": 2,
	"sonarjs/index-of-compare-to-positive-number": 2,
	"sonarjs/inverted-assertion-arguments": 2,
	"sonarjs/max-union-size": 2,
	"sonarjs/misplaced-loop-counter": 2,
	"sonarjs/new-operator-misuse": 2,
	"sonarjs/no-all-duplicated-branches": 2,
	"sonarjs/no-alphabetical-sort": 2,
	"sonarjs/no-array-delete": 2,
	"sonarjs/no-associative-arrays": 2,
	"sonarjs/no-built-in-override": 2,
	"sonarjs/no-case-label-in-switch": 2,
	"sonarjs/no-collapsible-if": 2,
	"sonarjs/no-collection-size-mischeck": 2,
	"sonarjs/no-delete-var": 2,
	"sonarjs/no-duplicate-in-composite": 2,
	"sonarjs/no-element-overwrite": 2,
	"sonarjs/no-empty-after-reluctant": 2,
	"sonarjs/no-empty-alternatives": 2,
	"sonarjs/no-empty-collection": 2,
	"sonarjs/no-empty-group": 2,
	"sonarjs/no-equals-in-for-termination": 2,
	"sonarjs/no-extra-arguments": 2,
	"sonarjs/no-for-in-iterable": 2,
	"sonarjs/no-function-declaration-in-block": 2,
	"sonarjs/no-global-this": 2,
	"sonarjs/no-globals-shadowing": 2,
	"sonarjs/no-gratuitous-expressions": 2,
	"sonarjs/no-identical-expressions": 2,
	"sonarjs/no-identical-functions": 2,
	"sonarjs/no-ignored-exceptions": 2,
	"sonarjs/no-ignored-return": 2,
	"sonarjs/no-implicit-global": 2,
	"sonarjs/no-in-misuse": 2,
	"sonarjs/no-incomplete-assertions": 2,
	"sonarjs/no-incorrect-string-concat": 2,
	"sonarjs/no-invalid-await": 2,
	"sonarjs/no-invariant-returns": 2,
	"sonarjs/no-inverted-boolean-check": 2,
	"sonarjs/no-labels": 2,
	"sonarjs/no-literal-call": 2,
	"sonarjs/no-misleading-array-reverse": 2,
	"sonarjs/no-nested-assignment": 2,
	"sonarjs/no-nested-incdec": 2,
	"sonarjs/no-nested-switch": 2,
	"sonarjs/no-nested-template-literals": 2,
	"sonarjs/no-one-iteration-loop": 2,
	"sonarjs/no-parameter-reassignment": 2,
	"sonarjs/no-primitive-wrappers": 2,
	"sonarjs/no-redundant-assignments": 2,
	"sonarjs/no-redundant-boolean": 2,
	"sonarjs/no-redundant-jump": 2,
	"sonarjs/no-redundant-optional": 2,
	"sonarjs/no-reference-error": 2,
	"sonarjs/no-same-line-conditional": 2,
	"sonarjs/no-try-promise": 2,
	"sonarjs/no-undefined-argument": 2,
	"sonarjs/no-undefined-assignment": 2,
	"sonarjs/no-unthrown-error": 2,
	"sonarjs/no-unused-collection": 2,
	"sonarjs/no-useless-increment": 2,
	"sonarjs/no-useless-intersection": 2,
	"sonarjs/no-use-of-empty-return-value": 2,
	"sonarjs/no-wildcard-import": 2,
	"sonarjs/non-existent-operator": 2,
	"sonarjs/non-number-in-arithmetic-expression": 2,
	"sonarjs/null-dereference": 2,
	"sonarjs/operation-returning-nan": 2,
	"sonarjs/post-message": 2,
	"sonarjs/prefer-immediate-return": 2,
	"sonarjs/prefer-object-literal": 2,
	"sonarjs/prefer-promise-shorthand": 2,
	"sonarjs/prefer-while": 2,
	"sonarjs/reduce-initial-value": 2,
	"sonarjs/single-character-alternation": 2,
	"sonarjs/stateful-regex": 2,
	"sonarjs/strings-comparison": 2,
	"sonarjs/super-invocation": 2,
	"sonarjs/unicode-aware-regex": 2,
	"sonarjs/unused-named-groups": 2,
	"sonarjs/values-not-convertible-to-numbers": 2
}

module.exports = [
	{
		linterOptions,
		languageOptions: {
			globals: global
		},
		files: ["**/*.js"],
		ignores: ["!*.js"],
		plugins: {
			unicorn,
			sonarjs,
			"@stylistic/js": stylistic
		},
		rules
	},{
		linterOptions,
		languageOptions: {
			globals: globals.node
		},
		files: ["*.js"],
		plugins: {
			unicorn,
			sonarjs,
			"@stylistic/js": stylistic
		},
		rules
	},{
		linterOptions,
		languageOptions: {
			globals: global,
			parser: require("@html-eslint/parser")
		},
		files: ["**/*.html"],
		plugins: {
			unicorn,
			sonarjs,
			"@stylistic/js": stylistic,
			"@html-eslint": htmlESLint,
			html
		},
		settings: {
			"html/html-extensions": [".html"]
		},
		rules: {
			...rules,

			"@html-eslint/require-meta-charset": 2,
			"@html-eslint/require-button-type": 2,
			"@html-eslint/no-restricted-attrs": 2,
			"@html-eslint/no-multiple-h1": 2,
			"@html-eslint/require-meta-description": 2,
			"@html-eslint/no-skip-heading-levels": 2,
			"@html-eslint/require-frame-title": 2,
			"@html-eslint/no-non-scalable-viewport": 2,
			"@html-eslint/no-positive-tabindex": 2,
			"@html-eslint/require-meta-viewport": 2,
			"@html-eslint/no-abstract-roles": 2,
			"@html-eslint/no-aria-hidden-body": 2,
			"@html-eslint/no-accesskey-attrs": 2,
			"@html-eslint/no-multiple-empty-lines": 2,
			"@html-eslint/no-trailing-spaces": 2,
			"@html-eslint/indent": [2, "tab"],
			"@html-eslint/no-duplicate-attrs": 2,
			"@html-eslint/no-inline-styles": 2,
			"@html-eslint/no-duplicate-id": 2,
			"@html-eslint/no-script-style-type": 2,
			"@html-eslint/require-li-container": 2,
			"@html-eslint/require-closing-tags": 2,
			"@html-eslint/require-doctype": 2,
			"@html-eslint/require-lang": 2,
			"@html-eslint/require-title": 2,
			"@html-eslint/no-extra-spacing-attrs": 2,
			"@html-eslint/lowercase": 2,
			"@html-eslint/element-newline": [2, {skip: ["p", "span", "li", "h1", "h2", "h3", "h4", "h5", "small", "td", "a"]}],
			"@html-eslint/quotes": 2,
			"@html-eslint/require-img-alt": 2
		}
	}
]
