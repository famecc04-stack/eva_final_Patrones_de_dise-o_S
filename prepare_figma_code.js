const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, 'prototipo_interactivo', 'wireframes_figma');

function getCodeForScreen(filename, screenName, xPos) {
  const content = fs.readFileSync(path.join(svgDir, filename), 'utf8')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');

  return `const svg = \`${content}\`;
const node = figma.createNodeFromSvg(svg);
node.name = "${screenName}";
node.x = ${xPos};
node.y = 0;
figma.currentPage.appendChild(node);
return { createdNodeIds: [node.id], name: node.name, x: node.x, y: node.y, width: node.width, height: node.height };`;
}

const s2Code = getCodeForScreen('02_Dashboard_Principal.svg', '02_Dashboard_Principal', 1600);
fs.writeFileSync('s2_code.js', s2Code);
console.log('S2 Code written, length:', s2Code.length);

const s3Code = getCodeForScreen('03_Gestion_Productos_Iterator.svg', '03_Gestion_Productos_Iterator', 3200);
fs.writeFileSync('s3_code.js', s3Code);
console.log('S3 Code written, length:', s3Code.length);
