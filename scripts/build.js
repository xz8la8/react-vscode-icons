const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const transform = require("./transform");

const fileIconSrcDir = path.join(__dirname, "../vscode-icons");
const fileIconDestDir = path.join(__dirname, "../es");

const fileIconTemplate = _.template(
  fs.readFileSync(path.join(__dirname, "templates/FileIcon.tpl"), {
    encoding: "utf-8"
  })
);

const galleryTemplate = _.template(
  fs.readFileSync(path.join(__dirname, "templates/Gallery.tpl"), {
    encoding: "utf-8"
  })
);

console.log("⛷  开始生成");
rimraf.sync(fileIconDestDir);
mkdirp.sync(fileIconDestDir);

const components = [];
fs.readdirSync(fileIconSrcDir, { encoding: "utf-8" }).forEach(item => {
  const fileName = path.basename(item, path.extname(item));
  const componentName = _.upperFirst(_.camelCase(fileName));
  components.push(componentName);
  let content = fs.readFileSync(path.join(fileIconSrcDir, item), {
    encoding: "utf-8"
  });
  const code = transform(content);
  const finalContent = fileIconTemplate({
    componentName,
    code
  });
  fs.writeFileSync(
    path.join(fileIconDestDir, `${componentName}.jsx`),
    finalContent,
    {
      encoding: "utf-8"
    }
  );
});

fs.writeFileSync(
  path.join(fileIconDestDir, `gallery.js`),
  galleryTemplate({ components: JSON.stringify(components) })
);

console.log("🚀  生成成功");
