const babel = require("@babel/core");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

function transform(svgString) {
  const str = 'const SVG = ' + svgString;
  const ast = parse(str, {
    plugins: ["jsx"]
  });

  traverse(ast, {
    enter({ node, parent }) {
      if (isSvg(node)) {
        setSvgAttr(node.attributes);
        node.attributes.push({
          type: "JSXSpreadAttribute",
          argument: {
            type: "Identifier",
            name: "props"
          }
        });
      } else if (isJSXElement(node)) {
        setNodeAttr(node.attributes);
      }
    }
  });

  // makeLastStatementReturn(ast.program);

  const content = generate(ast);

  const { code } = babel.transform(content.code, {
    plugins: [["@babel/plugin-transform-react-jsx", { loose: true }]]
  });

  return code;
}

function isSvg(node) {
  return node.type === "JSXOpeningElement" && node.name.name === "svg";
}

function isJSXElement(node) {
  return node.type === "JSXOpeningElement";
}

function setSvgAttr(attrs) {
  for (let i = 0, len = attrs.length; i < len; i++) {
    const attr = attrs[i];
    if (attr.name.name === "width" || attr.name.name === "height") {
      attr.value.value = "1em";
    }
    if (attr.name.name === "xmlns") {
      attrs.splice(i, 1);
    }
  }
}

function setNodeAttr(attrs) {
  for (let i = 0, len = attrs.length; i < len; i++) {
    const attr = attrs[i];
    if (attr.name.name === "fill") {
      attr.value.value = "currentColor";
    }
  }
}

module.exports = transform;
