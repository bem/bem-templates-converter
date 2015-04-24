var syntax = require(".."),
    assert = require("assert"),
    bemxjst = require("bem-xjst"),
    // TODO pull proper latest i-bem.bemhtml from bem-core
    ibem = require("./fixtures/i-bem"),
    compat = require("bemhtml-compat"),
    esprima = require("esprima"),
    esgen = require("escodegen").generate,
    path = require("path"),
    fs = require("fs");

var pp = require("zeHelpers").prettyPrint;

var common = exports;

function getSource(fn) {
  if (typeof fn === 'string') return fn;
  return fn.toString().replace(/^function\s*\(\)\s*{\/\*|\*\/}$/g, '');
};
common.getSource = getSource;

function testParse(source, result) {
    var code = getSource(source),
        ast = syntax.parse(code);
    assert.deepEqual(ast, result );
}
common.testParse = testParse;

function testTransform(source, result) {
    var code = getSource(source),
        ast = syntax.parse(code),
        extAst = syntax.translate(ast);
    assert.deepEqual(extAst, result );
}
common.testTransform = testTransform;

function toHtml(source, input) {
  return bemxjst.compile(ibem + source, {}).apply.call(input);
}
common.toHtml;

function testCompile(source, json, html, target) {
  var code = getSource(source),
      compiled = syntax.compile(code),
      result = html || toHtml(compat.transpile(code), json);

  // Test against a hand-written template when supplied
  if (target) {
    target = getSource(target);
    // generated code
    assert.equal(
      esgen(esprima.parse(compiled)),
      esgen(esprima.parse(target)));

    // HTML
    assert.equal(
      toHtml(compiled, json),
      toHtml(target, json));

  };

  // HTML
  assert.equal(
    toHtml(compiled, json),
    result);
}
common.testCompile = testCompile;

function maybeRead(f) {
  var utf8 = { encoding:'utf8' };
  try {
    return fs.readFileSync(f, utf8);
  } catch (e) {
    return undefined;
  }
}

function testDir(dirname) {
  var dir = path.join(path.dirname(module.filename), dirname),
      tests = fs.readdirSync(dir).filter(function (f) {
        return /\.bemhtml$/i.test(f);
      }).map(function (f) {
        return path.basename(f, '.bemhtml');
      }).forEach(function (name) {
        var base = dir + '/' + name,
            source = maybeRead(base + '.bemhtml'),
            target = maybeRead(base + '.bemhtml.js'),
            json = (new Function('return ' + maybeRead(base + '.json')))(),
            html = maybeRead(base + '.html'),
            msg = maybeRead(base + '.msg') || name;
        it(msg, function () {
          testCompile(source, json, html, target);
        });
      });
}
common.testDir = testDir;