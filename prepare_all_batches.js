const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, 'prototipo_interactivo', 'wireframes_figma');

function getSnippet(filename, screenName, xPos) {
  const content = fs.readFileSync(path.join(svgDir, filename), 'utf8')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');

  return `{
  const svg = \`${content}\`;
  const node = figma.createNodeFromSvg(svg);
  node.name = "${screenName}";
  node.x = ${xPos};
  node.y = 0;
  figma.currentPage.appendChild(node);
  created.push({ id: node.id, name: node.name, x: node.x, y: node.y });
}`;
}

function makeBatch(items) {
  let body = 'const created = [];\n';
  items.forEach(it => {
    body += getSnippet(it.file, it.name, it.x) + '\n';
  });
  body += 'return { createdNodeIds: created.map(c => c.id), nodes: created };';
  return body;
}

const b1 = makeBatch([
  { file: '02_Dashboard_Principal.svg', name: '02_Dashboard_Principal', x: 1600 },
  { file: '03_Gestion_Productos_Iterator.svg', name: '03_Gestion_Productos_Iterator', x: 3200 }
]);
fs.writeFileSync('batch1.js', b1, 'utf8');
console.log('Batch 1 len:', b1.length);

const b2 = makeBatch([
  { file: '04_Inventario_Alertas_Observer.svg', name: '04_Inventario_Alertas_Observer', x: 4800 },
  { file: '05_Gestion_Pedidos_Command.svg', name: '05_Gestion_Pedidos_Command', x: 6400 }
]);
fs.writeFileSync('batch2.js', b2, 'utf8');
console.log('Batch 2 len:', b2.length);

const b3 = makeBatch([
  { file: '06_Procesamiento_Pagos_Adapter.svg', name: '06_Procesamiento_Pagos_Adapter', x: 8000 },
  { file: '07_Configuracion_Precios_Strategy.svg', name: '07_Configuracion_Precios_Strategy', x: 9600 }
]);
fs.writeFileSync('batch3.js', b3, 'utf8');
console.log('Batch 3 len:', b3.length);

const b4 = makeBatch([
  { file: '08_Reportes_Financieros_Proxy.svg', name: '08_Reportes_Financieros_Proxy', x: 11200 },
  { file: '09_Usuarios_Roles_RBAC.svg', name: '09_Usuarios_Roles_RBAC', x: 12800 }
]);
fs.writeFileSync('batch4.js', b4, 'utf8');
console.log('Batch 4 len:', b4.length);

const b5 = makeBatch([
  { file: '10_Historial_Operaciones_Memento.svg', name: '10_Historial_Operaciones_Memento', x: 14400 },
  { file: '11_Configuracion_General.svg', name: '11_Configuracion_General', x: 16000 }
]);
fs.writeFileSync('batch5.js', b5, 'utf8');
console.log('Batch 5 len:', b5.length);
