var kr = exports,
    esprima = require("esprima"),
    ometajs = null,
    KParser = null,
    KCollapse = null,
    KTransformer = null,
    KSerializer = null;

function lazyLoad() {
  ometajs = require("ometajs");
  KParser = require("./ometa/bemhtml-krasota").Parser;
  KCollapse = require("./ometa/bemhtml-krasota").CollapseSub;
  KTransformer = require("./ometa/bemhtml-krasota").Transformer;
  KSerializer = require("./ometa/bemhtml-krasota").Serializer;
}

// Parse old bemhtml source
kr.parse = function parse(source, options) {
  lazyLoad();
  return KParser.match(source, 'topLevel', options);
};

kr.collapse = function collapse(ast, options) {
  lazyLoad();
  return KCollapse.match(ast, 'topLevel', options);
};

// Translate old ast to new ast
kr.translate = function translate(ast, options) {
  lazyLoad();
  return KTransformer.match(ast, 'topLevel', options);
};

// Serialize new simplified AST into JavaScript code
kr.generate = function generate(newAst, options) {
  lazyLoad();
  return KSerializer.match(newAst, 'topLevel', options);
};

// Compile old source to new source
kr.compile = function compile(source, options) {
  // NOTE If code is ECMAScript compatible - there is no need to use ometajs
  // Because js is ignored no beautification is performed. If you want to
  // beautify stuff, pass non-empty options object.
  try {
    if (esprima.parse(source) && Object.keys(options).length === 0) return source;
  } catch (e) {
  }

  lazyLoad();
  var ast = kr.translate(kr.parse(source, options), options);
  // ast = kr.collapse(ast);
  return kr.generate(ast, options);
};
